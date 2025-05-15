# Booking Sync Service

A simple Node.js service to manually or automatically sync booking data.

---

## 🚀 Setup Steps

1. **Use Node.js v20**
   Make sure you're using Node.js version 20. You can use [nvm](https://github.com/nvm-sh/nvm) to switch Node versions easily.

2. **Install Dependencies**
   Run the following command to install all necessary packages:

   ```bash
   npm install
   ```

3. **Start the Server**
   Start the application using:

   ```bash
   npm start
   ```

   The server will run on port `3001` or the port defined in your `.env` file.

---

## ⚙️ .env Configuration

.env file is attached with assignment link.

## 🔄 How to Run Manual Sync

To run a manual sync between two dates, execute the following cURL command:

```bash
curl --location 'http://localhost:3001/api/bookings/sync' \
--header 'Content-Type: application/json' \
--data '{
    "fromDate": "2025-04-15",
    "toDate": "2025-04-20"
}'
```

Update the `fromDate` and `toDate` values as required.

---

## ⏱️ How to Test Cron Job

To test the cron job:

1. Open your `.env` file.
2. Set:

   ```env
   IS_CRON=true
   ```
3. Restart the server using:

   ```bash
   npm start
   ```
4. The cron job will now run automatically every 30 minutes.


