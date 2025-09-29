
# Farm-to-Fork Traceability System using Firebase

This document provides a comprehensive guide to implementing a QR-based farm-to-fork traceability system for agricultural products using Firebase. It covers the database schema, code samples for data manipulation, QR code integration, security rules, and best practices.

## 1. Firebase Database Schema (Firestore)

We will use Cloud Firestore for its powerful querying capabilities, offline support, and real-time data synchronization. Here is the suggested collection and document structure based on your requirements.

### Collection: `batches`
This collection stores information about each batch of crops. The document ID can be a unique auto-generated ID or a custom `batchId`.

- **Document:** `[batchId]`
  - `cropName`: (string) - e.g., "Tomatoes"
  - `harvestDate`: (timestamp) - Date of harvest
  - `quantity`: (number) - in kg
  - `farmerId`: (string) - Reference to a document in the `farmers` collection
  - `createdAt`: (timestamp) - When the batch was registered in the system

### Collection: `farmers`
This collection stores details about the farmers and their farms.

- **Document:** `[farmerId]`
  - `name`: (string) - "Ram Singh"
  - `fpoName`: (string, optional) - "MahaFPO"
  - `farmLocation`: (object)
    - `village`: (string)
    - `district`: (string)
    - `state`: (string)
    - `coordinates`: (geopoint) - Firestore geopoint for mapping
  - `cultivationType`: (string) - "organic", "natural", or "conventional"
  - `certificationStatus`: (boolean) - `true` if certified

### Collection: `supplyChainStages`
This collection tracks the product's journey through the supply chain. Each document represents a stage for a specific batch.

- **Document:** `[uniqueStageId]`
  - `batchId`: (string) - Reference to the batch
  - `stageName`: (string) - "Harvest", "Aggregation", "Logistics", "Retailer"
  - `actorId`: (string) - ID of the person/entity responsible
  - `actorRole`: (string) - "Farmer", "Aggregator", "Driver"
  - `timestamp`: (timestamp) - When this stage was completed
  - `location`: (geopoint)
  - `verifiedBy`: (string) - ID of the verifier (e.g., coordinator)
  - `blockchainHash`: (string, optional)

### Collection: `certifications`
Stores links and details about various certifications.

- **Document:** `[certificationId]`
  - `batchId`: (string) - The batch this applies to
  - `name`: (string) - "FSSAI License", "Organic Certificate"
  - `url`: (string) - Link to the certificate PDF/image
  - `validityDate`: (timestamp)
  - `complianceTags`: (array of strings) - ["FSSAI", "Organic"]

### Collection: `pricing`
Stores pricing information for a batch to ensure transparency.

- **Document:** `[batchId]` (using the same ID as the batch)
  - `farmerPrice`: (number)
  - `distributorPrice`: (number)
  - `wholesalePrice`: (number)
  - `retailPrice`: (number)
  - `paymentStatus`: (string) - "Paid to Farmer", "Pending"

### Collection: `labReports`
Stores lab test reports for pesticide analysis.

- **Document:** `[reportId]`
  - `batchId`: (string)
  - `reportUrl`: (string)
  - `testedAt`: (timestamp)
  - `summary`: (string) - e.g., "No pesticides detected"

## 2. Code Samples (Web - JavaScript)

Here are examples of how to add, update, and retrieve data using the Firebase Web SDK. First, set up Firebase in your project.

```javascript
// src/lib/firebase-config.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // Your config from the Firebase console
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
```

### Add a New Batch (and related data)

This function can be used when a farmer or coordinator registers a new harvest. It uses a batched write to ensure all related data is added atomically.

```javascript
import { db } from './lib/firebase-config';
import { collection, doc, writeBatch, serverTimestamp } from "firebase/firestore";

async function addNewBatch(batchData) {
  const batch = {
    cropName: batchData.cropName,
    harvestDate: new Date(batchData.harvestDate),
    quantity: batchData.quantity,
    farmerId: batchData.farmerId,
    createdAt: serverTimestamp(),
  };

  const batchRef = doc(collection(db, "batches"));
  const batchId = batchRef.id;

  const batch = writeBatch(db);

  // 1. Create the batch document
  batch.set(batchRef, batch);

  // 2. Create the initial supply chain stage (Harvest)
  const supplyChainRef = doc(collection(db, "supplyChainStages"));
  batch.set(supplyChainRef, {
    batchId: batchId,
    stageName: "Harvest / Farmer",
    actorId: batchData.farmerId,
    actorRole: "Farmer",
    timestamp: serverTimestamp(),
    location: batchData.farmLocation.coordinates, // Assuming geopoint
    verifiedBy: batchData.coordinatorId,
  });

  // 3. Create the pricing document
  const pricingRef = doc(db, "pricing", batchId);
  batch.set(pricingRef, {
    farmerPrice: batchData.farmerPrice,
    paymentStatus: "Pending"
  });

  try {
    await batch.commit();
    console.log("New batch created with ID: ", batchId);
    return batchId;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
```

### Update a Supply Chain Stage

This function adds a new stage to the supply chain for an existing batch.

```javascript
import { db } from './lib/firebase-config';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

async function addSupplyChainStage(stageData) {
  try {
    const docRef = await addDoc(collection(db, "supplyChainStages"), {
      batchId: stageData.batchId,
      stageName: stageData.stageName, // e.g., "Logistics / Transport"
      actorId: stageData.actorId,
      actorRole: stageData.actorRole,
      timestamp: serverTimestamp(),
      location: stageData.location,
    });
    console.log("New stage added with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding stage: ", e);
  }
}
```

### Retrieve Traceability Data by Batch ID

This is the core function for the consumer view. When a QR code is scanned, it will contain a `batchId`. Use this function to fetch all related data.

```javascript
import { db } from './lib/firebase-config';
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

async function getTraceabilityData(batchId) {
  const traceabilityData = {};

  // 1. Get Batch Info
  const batchRef = doc(db, "batches", batchId);
  const batchSnap = await getDoc(batchRef);
  if (!batchSnap.exists()) {
    throw new Error("Batch not found!");
  }
  traceabilityData.batchInfo = batchSnap.data();

  // 2. Get Farmer Details
  const farmerRef = doc(db, "farmers", traceabilityData.batchInfo.farmerId);
  const farmerSnap = await getDoc(farmerRef);
  if (farmerSnap.exists()) {
    traceabilityData.farmerInfo = farmerSnap.data();
  }

  // 3. Get Supply Chain Stages
  const stagesQuery = query(collection(db, "supplyChainStages"), where("batchId", "==", batchId));
  const stagesSnap = await getDocs(stagesQuery);
  traceabilityData.supplyChain = stagesSnap.docs.map(doc => doc.data()).sort((a, b) => a.timestamp - b.timestamp);

  // 4. Get Pricing
  const pricingRef = doc(db, "pricing", batchId);
  const pricingSnap = await getDoc(pricingRef);
  if (pricingSnap.exists()) {
    traceabilityData.pricing = pricingSnap.data();
  }
  
  // ... Fetch certifications, lab reports etc. similarly

  return traceabilityData;
}
```

## 3. QR Scan-Based Data Fetch

When you generate a QR code for a product batch, the value it contains should be the `batchId` (or a URL containing it, e.g., `https://krishisaarthi.com/trace?batchId=XYZ`).

On your web app (or Android app), you'll have a page that can handle this.

**Web Example (Next.js Page):**

```javascript
// pages/trace.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getTraceabilityData } from '../lib/firebase-utils'; // Assume you have this file

export default function TracePage() {
  const router = useRouter();
  const { batchId } = router.query;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (batchId) {
      getTraceabilityData(batchId)
        .then(setData)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [batchId]);

  if (loading) return <div>Loading traceability data...</div>;
  if (!data) return <div>No data found for this batch.</div>;

  return (
    <div>
      <h1>Traceability for {data.batchInfo.cropName}</h1>
      {/* Render the traceability data here */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```

## 4. Suggested Firebase Security Rules

Security rules are crucial to protect your data. These rules are a starting point and should be refined based on your exact user roles and permissions.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Anyone can read traceability data if they have the batchId
    match /batches/{batchId} {
      allow read: if true;
      allow create, update: if request.auth != null; // Only authenticated users can create/update
    }

    match /farmers/{farmerId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == farmerId; // Farmers can update their own profile
    }

    match /supplyChainStages/{stageId} {
      allow read: if true;
      allow create: if request.auth != null; // Authenticated users (e.g., coordinators) can add stages
    }

    match /pricing/{batchId} {
      allow read: if true;
      allow write: if request.auth != null; // Or more specific role-based access
    }

    // Certifications and reports are public to read
    match /certifications/{certId} {
      allow read: if true;
      allow create: if request.auth != null;
    }
    match /labReports/{reportId} {
      allow read: if true;
      allow create: if request.auth != null;
    }
  }
}
```

## 5. Best Practices for Offline Sync + Cache

Cloud Firestore has excellent built-in offline capabilities.

1.  **Enable Persistence:** For web applications, you can enable offline persistence with a single line of code. This caches a copy of your Firestore data that your app is actively using, so your app can access the data when it's offline.

    ```javascript
    import { initializeApp } from 'firebase/app';
    import { getFirestore, enableIndexedDbPersistence } from 'firebase/firestore';

    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    enableIndexedDbPersistence(db)
      .catch((err) => {
        if (err.code == 'failed-precondition') {
          // Multiple tabs open, persistence can only be enabled in one.
        } else if (err.code == 'unimplemented') {
          // The current browser does not support all of the
          // features required to enable persistence.
        }
      });
    ```

2.  **Listen for Real-Time Updates:** Instead of one-time `get()` calls, use `onSnapshot()` to listen for real-time changes. This keeps your local cache up-to-date and provides a more responsive user experience. When the device is offline, `onSnapshot()` will read from the local cache.

3.  **Manage Cache Size:** Firestore's cache can grow. While it manages this automatically, you can configure the cache size if needed, though the default settings are usually sufficient for most applications.

By following this guide, you can build a robust and scalable traceability system on Firebase that empowers consumers with transparent information and supports your farmers.
