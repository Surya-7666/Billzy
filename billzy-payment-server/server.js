const express = require("express");
const cors = require("cors");
const crypto = require("crypto");
const Razorpay = require("razorpay");
const {
  S3Client,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const {
  getSignedUrl,
} = require("@aws-sdk/s3-request-presigner");

require("dotenv").config();

const app = express();

const PORT = Number(process.env.PORT || 5001);

const FRONTEND_ORIGIN =
  process.env.FRONTEND_ORIGIN || "http://localhost:5173";

const BILLZY_PRICE_PAISE = Number(
  process.env.BILLZY_PRICE_PAISE || 49900
);

const DOWNLOAD_SECRET = process.env.DOWNLOAD_SECRET;

const AWS_REGION =
  process.env.AWS_REGION || "ap-south-1";

const S3_BUCKET_NAME =
  process.env.S3_BUCKET_NAME;

const S3_OBJECT_KEY =
  process.env.S3_OBJECT_KEY || "Billzy-Windows.zip";

/* ---------------------------------
   REQUIRED ENVIRONMENT VARIABLES
--------------------------------- */

if (!process.env.RAZORPAY_KEY_ID) {
  console.error("Missing RAZORPAY_KEY_ID");
  process.exit(1);
}

if (!process.env.RAZORPAY_KEY_SECRET) {
  console.error("Missing RAZORPAY_KEY_SECRET");
  process.exit(1);
}

if (!DOWNLOAD_SECRET) {
  console.error("Missing DOWNLOAD_SECRET");
  process.exit(1);
}

if (!S3_BUCKET_NAME) {
  console.error("Missing S3_BUCKET_NAME");
  process.exit(1);
}

/* ---------------------------------
   RAZORPAY
--------------------------------- */

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/* ---------------------------------
   AWS S3
--------------------------------- */

const s3 = new S3Client({
  region: AWS_REGION,
});

/* ---------------------------------
   MIDDLEWARE
--------------------------------- */

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
  })
);

app.use(express.json());

/* ---------------------------------
   HEALTH CHECK
--------------------------------- */

app.get("/api/health", (req, res) => {
  res.json({
    ok: true,
    service: "Billzy Payment Server",
    storage: "Amazon S3",
  });
});

/* ---------------------------------
   CREATE RAZORPAY ORDER
--------------------------------- */

app.post("/api/payment/create-order", async (req, res) => {
  try {
    const order = await razorpay.orders.create({
      amount: BILLZY_PRICE_PAISE,
      currency: "INR",
      receipt: `billzy_${Date.now()}`,
    });

    res.json({
      success: true,
      keyId: process.env.RAZORPAY_KEY_ID,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error("Create order error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create payment order",
    });
  }
});

/* ---------------------------------
   VERIFY PAYMENT
--------------------------------- */

app.post("/api/payment/verify", async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment details are incomplete",
      });
    }

    /* -------------------------------
       VERIFY RAZORPAY SIGNATURE
    ------------------------------- */

    const generatedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    if (
      generatedSignature !== razorpay_signature
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature",
      });
    }

    /* -------------------------------
       FETCH PAYMENT FROM RAZORPAY
    ------------------------------- */

    const payment =
      await razorpay.payments.fetch(
        razorpay_payment_id
      );

    /* -------------------------------
       VERIFY ORDER
    ------------------------------- */

    if (
      payment.order_id !== razorpay_order_id
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment order mismatch",
      });
    }

    /* -------------------------------
       VERIFY AMOUNT
    ------------------------------- */

    if (
      Number(payment.amount) !==
      BILLZY_PRICE_PAISE
    ) {
      return res.status(400).json({
        success: false,
        message: "Payment amount mismatch",
      });
    }

    /* -------------------------------
       VERIFY CAPTURE
    ------------------------------- */

    if (payment.status !== "captured") {
      return res.status(400).json({
        success: false,
        message:
          `Payment is not captured. Current status: ${payment.status}`,
      });
    }

    /* -------------------------------
       CREATE DOWNLOAD TOKEN
    ------------------------------- */

    const expiresAt =
      Date.now() + 24 * 60 * 60 * 1000;

    const payload = Buffer.from(
      JSON.stringify({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        exp: expiresAt,
      })
    ).toString("base64url");

    const signature = crypto
      .createHmac(
        "sha256",
        DOWNLOAD_SECRET
      )
      .update(payload)
      .digest("base64url");

    const token = `${payload}.${signature}`;

    res.json({
      success: true,
      message: "Payment verified successfully",
      downloadUrl:
        `/download?token=${encodeURIComponent(token)}`,
      expiresAt,
    });
  } catch (error) {
    console.error(
      "Payment verification error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to verify payment",
    });
  }
});

/* ---------------------------------
   PROTECTED DOWNLOAD
--------------------------------- */

app.get("/download", async (req, res) => {
  try {
    const token = req.query.token;

    if (!token) {
      return res.status(401).send(
        "Payment required."
      );
    }

    const parts = token.split(".");

    if (parts.length !== 2) {
      return res.status(401).send(
        "Invalid download link."
      );
    }

    const [payload, signature] = parts;

    /* -------------------------------
       VERIFY DOWNLOAD TOKEN
    ------------------------------- */

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        DOWNLOAD_SECRET
      )
      .update(payload)
      .digest("base64url");

    const providedSignatureBuffer =
      Buffer.from(signature);

    const expectedSignatureBuffer =
      Buffer.from(expectedSignature);

    if (
      providedSignatureBuffer.length !==
      expectedSignatureBuffer.length ||
      !crypto.timingSafeEqual(
        providedSignatureBuffer,
        expectedSignatureBuffer
      )
    ) {
      return res.status(401).send(
        "Invalid download link."
      );
    }

    /* -------------------------------
       READ TOKEN
    ------------------------------- */

    let data;

    try {
      data = JSON.parse(
        Buffer.from(
          payload,
          "base64url"
        ).toString("utf8")
      );
    } catch {
      return res.status(401).send(
        "Invalid download token."
      );
    }

    /* -------------------------------
       CHECK EXPIRATION
    ------------------------------- */

    if (
      !data.exp ||
      Date.now() > Number(data.exp)
    ) {
      return res.status(410).send(
        "This download link has expired."
      );
    }

    /* -------------------------------
       CREATE TEMPORARY S3 URL
    ------------------------------- */

    const command = new GetObjectCommand({
      Bucket: S3_BUCKET_NAME,
      Key: S3_OBJECT_KEY,
      ResponseContentDisposition:
        'attachment; filename="Billzy-Windows.zip"',
      ResponseContentType:
        "application/zip",
    });

    /*
      S3 URL is valid for only 10 minutes.
      The Billzy payment token itself remains
      valid for 24 hours.
    */

    const signedUrl =
      await getSignedUrl(
        s3,
        command,
        {
          expiresIn: 10 * 60,
        }
      );

    /* -------------------------------
       REDIRECT TO S3
    ------------------------------- */

    return res.redirect(signedUrl);
  } catch (error) {
    console.error(
      "Download error:",
      error
    );

    return res.status(500).send(
      "Unable to prepare the download."
    );
  }
});

/* ---------------------------------
   START SERVER
--------------------------------- */

app.listen(
  PORT,
  "0.0.0.0",
  () => {
    console.log(
      `Billzy payment server running on port ${PORT}`
    );

    console.log(
      `S3 bucket: ${S3_BUCKET_NAME}`
    );

    console.log(
      `S3 region: ${AWS_REGION}`
    );

    console.log(
      `S3 object: ${S3_OBJECT_KEY}`
    );
  }
);
