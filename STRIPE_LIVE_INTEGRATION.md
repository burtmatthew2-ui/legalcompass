# Integrating Live Stripe into Legal Compass

This guide walks you through switching from Stripe test mode to live mode for production payments.

## Prerequisites

- Stripe account with business verification completed
- Access to Stripe Dashboard
- Legal Compass app deployed and running

## Step 1: Complete Stripe Account Setup

1. **Business Verification**
   - Go to https://dashboard.stripe.com/settings/account
   - Complete all required business information
   - Submit identity verification documents
   - Wait for Stripe approval (can take 1-3 business days)

2. **Enable Payment Methods**
   - Navigate to Settings > Payment methods
   - Enable desired payment methods (cards, wallets, etc.)
   - Configure currency settings

## Step 2: Activate Live Mode Products

1. **Access Product Settings**
   - Go to https://dashboard.stripe.com/test/products
   - Switch to "Live mode" toggle (top right)

2. **Recreate Your Product in Live Mode**
   Since products don't transfer from test to live, create a new product:
   
   - Click "+ Create product"
   - Name: "Legal Compass Premium"
   - Description: "Unlimited access to AI-powered legal research with all features"
   
3. **Create Recurring Price**
   - Pricing model: "Standard pricing"
   - Price: $4.99 USD
   - Billing period: "Weekly"
   - Interval: 2 (for every 2 weeks)
   - Click "Add pricing"

4. **Copy the Live Price ID**
   After creating, you'll see something like: `price_live_abc123xyz`
   **Save this ID** - you'll need it in Step 4

## Step 3: Get Live API Keys

1. **Navigate to API Keys**
   - Go to https://dashboard.stripe.com/apikeys
   - Ensure you're in **Live mode** (toggle top right)

2. **Reveal Secret Key**
   - Click "Reveal live key" for "Secret key"
   - Copy the key starting with `sk_live_...`
   - **Keep this secure!** Never share or commit to code

3. **Get Publishable Key**
   - Copy "Publishable key" starting with `pk_live_...`
   - This is safe to expose in frontend code

## Step 4: Update Your Application

### 4.1 Update Secret Key in Lovable Cloud

1. In Lovable, open your project settings
2. Navigate to Secrets or Backend settings
3. Find `STRIPE_SECRET_KEY`
4. Update it with your live secret key (`sk_live_...`)

### 4.2 Update Price ID in Code

Update the price ID in your pricing page:

**File: `src/pages/Pricing.tsx`**

Find this line:
```typescript
priceId: "price_1SMu3KArhAIMbV73p1v0bQKb",  // Current test price
```

Replace with your **live price ID from Step 2**:
```typescript
priceId: "price_live_abc123xyz",  // Your live price ID
```

Also update the product ID:
```typescript
productId: "prod_live_xyz123",  // Your live product ID
```

### 4.3 Deploy Changes

1. Commit and push your changes
2. Deploy to production
3. Verify the deployment is successful

## Step 5: Configure Stripe Customer Portal (Optional but Recommended)

1. **Navigate to Customer Portal Settings**
   - Go to https://dashboard.stripe.com/settings/billing/portal
   
2. **Enable Portal**
   - Click "Activate portal"
   - Customize branding (logo, colors)
   - Configure allowed actions:
     - ✅ Cancel subscriptions
     - ✅ Update payment methods
     - ✅ View invoices
   
3. **Set Business Information**
   - Add support email
   - Add terms of service URL
   - Add privacy policy URL

## Step 6: Test Live Payments

⚠️ **Use a real payment method for testing** - live mode charges real money!

1. **Create Test Account**
   - Use a different email than your main account
   - Sign up on your production site

2. **Complete Checkout**
   - Click "Subscribe Now"
   - Enter real card details
   - Complete payment

3. **Verify Subscription**
   - Check Stripe Dashboard > Payments
   - Confirm subscription appears in Dashboard > Subscriptions
   - Test accessing premium features in app

4. **Test Cancellation**
   - Go to "Manage Subscription" in app
   - Cancel subscription
   - Verify cancellation in Stripe Dashboard

## Step 7: Monitor & Maintain

### Webhook Setup (Future Enhancement)

For production, consider setting up webhooks for real-time subscription updates:

1. Go to https://dashboard.stripe.com/webhooks
2. Add endpoint: `https://yourdomain.com/stripe-webhook`
3. Select events:
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`

### Regular Checks

- Monitor failed payments in Dashboard
- Review subscription metrics
- Check for declined cards
- Monitor dispute/chargeback rate

## Important Security Notes

1. **Never commit live keys to Git**
   - Live keys should only be in environment variables
   - Use `.gitignore` for any local env files

2. **Restrict API Key Permissions**
   - Use restricted keys when possible
   - Only grant necessary permissions

3. **Enable Radar (Fraud Prevention)**
   - Go to https://dashboard.stripe.com/radar
   - Review and configure fraud rules
   - Enable 3D Secure for high-risk payments

## Troubleshooting

### "Invalid price ID" error
- Ensure you copied the **live** price ID, not test
- Verify price exists in live mode Dashboard

### "No such customer" error
- Customer IDs from test mode don't exist in live mode
- App will create new customers automatically in live mode

### Payments not processing
- Check Stripe Dashboard > Logs for errors
- Verify secret key is **live** key (`sk_live_...`)
- Ensure business verification is complete

### Subscription not activating in app
- Check edge function logs for errors
- Verify `check-subscription` function is using live Stripe key
- Confirm RLS policies allow subscription updates

## Support

If you encounter issues:
1. Check Stripe Dashboard > Logs
2. Review edge function logs in Lovable Cloud
3. Contact Stripe Support: https://support.stripe.com

## Summary Checklist

- [ ] Complete Stripe business verification
- [ ] Create product in live mode
- [ ] Create bi-weekly recurring price ($4.99)
- [ ] Copy live secret key and price ID
- [ ] Update `STRIPE_SECRET_KEY` in Lovable Cloud
- [ ] Update price ID in `src/pages/Pricing.tsx`
- [ ] Deploy changes to production
- [ ] Configure customer portal
- [ ] Test with real payment
- [ ] Monitor first few transactions

**You're now ready to accept real payments!** 🎉
