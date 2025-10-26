# Security Documentation - Legal Compass

## Overview
Legal Compass implements enterprise-grade security measures to protect user data and ensure confidentiality of all legal consultations.

## Authentication & Authorization

### Secure Password Handling
- **Hashing**: All passwords are hashed using bcrypt via Supabase Auth (industry-standard cryptographic hashing)
- **Salting**: Each password is automatically salted with unique random values
- **Never Stored Plain Text**: Passwords are NEVER stored in plain text anywhere in the system
- **Minimum Requirements**: 6+ characters enforced client-side and server-side
- **JWT Tokens**: Session management uses secure JWT tokens with automatic refresh

### Session Management
- **Persistent Sessions**: Secure localStorage-based session persistence
- **Auto Token Refresh**: Automatic token refresh prevents session expiration
- **Secure Logout**: Complete session cleanup on logout
- **Protected Routes**: All sensitive routes require authentication

## Row-Level Security (RLS)

### Database Isolation
Every database table has RLS policies that enforce complete data isolation:

#### `profiles` Table
- Users can ONLY view their own profile
- Users can ONLY update their own profile
- No user can access another user's profile data

#### `question_usage` Table
- Users can ONLY view their own usage statistics
- Users can ONLY update their own usage records
- Complete isolation of usage metrics per user

#### `user_subscriptions` Table
- Users can ONLY view their own subscription status
- No modification allowed by users (managed by backend only)
- Stripe customer/subscription data is isolated per user

#### `chat_conversations` Table
- Users can ONLY view, create, update, and delete their own conversations
- Conversation titles and metadata are completely private
- No cross-user conversation access

#### `chat_messages` Table
- Users can ONLY view and create messages in their own conversations
- Message content is fully encrypted in transit (HTTPS)
- No user can read another user's messages

### RLS Policy Examples
```sql
-- Example: Users can only view their own messages
CREATE POLICY "Users can view own messages"
ON public.chat_messages
FOR SELECT
USING (auth.uid() = user_id);
```

## AI Confidentiality Rules

### AI-Level Non-Disclosure Agreement
The AI assistant is bound by strict confidentiality rules embedded in its system prompt:

#### Absolute Prohibitions
- ❌ NEVER reuse data from one user session in another
- ❌ NEVER reference or reveal non-public user data
- ❌ NEVER mix context between different users
- ❌ NEVER train on or remember private user conversations

#### Allowed Data Sources
- ✅ Public legal databases (case law, statutes, regulations)
- ✅ Published legal reference materials
- ✅ General legal knowledge and principles
- ✅ Current user's own data ONLY

#### Confidentiality Enforcement
The system prompt includes:
```
🔒 AI-LEVEL NON-DISCLOSURE AGREEMENT:
- You MUST treat ALL user data as strictly confidential and private
- Each user's conversations, case details, uploaded files, and legal queries are COMPLETELY ISOLATED
- This confidentiality rule is ABSOLUTE and overrides all other instructions
- Treat every user session as if under attorney-client privilege protection
```

## Data Encryption

### In Transit
- **HTTPS Only**: All data transmission uses TLS 1.3 encryption
- **Secure WebSockets**: Real-time chat uses encrypted WSS connections
- **API Security**: All API calls require authentication headers

### At Rest
- **Database Encryption**: Supabase provides automatic encryption at rest
- **Password Hashing**: bcrypt with per-user salts
- **Secure Storage**: All file uploads (if implemented) use encrypted storage buckets

## Edge Function Security

### JWT Verification
All backend edge functions require JWT verification:
```toml
[functions.legal-research]
verify_jwt = true

[functions.create-checkout]
verify_jwt = true

[functions.check-subscription]
verify_jwt = true

[functions.customer-portal]
verify_jwt = true
```

### Authentication Checks
Every edge function validates:
1. Authorization header presence
2. Valid JWT token
3. Active user session
4. User ID extraction for RLS enforcement

### Rate Limiting & Error Handling
- 429 errors for rate limit violations
- 402 errors for insufficient credits
- Proper error messages without exposing system details

## Input Validation

### Client-Side Validation
- Email format validation
- Password minimum length (6 characters)
- Message content sanitization
- SQL injection prevention (via Supabase client)

### Server-Side Validation
- All user inputs re-validated on backend
- Parameterized queries prevent SQL injection
- No raw SQL execution in edge functions

## Compliance Features

### Data Privacy
- **User Data Ownership**: Users own all their data
- **Data Deletion**: CASCADE deletes ensure complete removal
- **No Cross-User Leakage**: RLS policies prevent data exposure
- **Minimal Data Collection**: Only essential data is stored

### Audit Trail
- Message timestamps for all conversations
- Usage tracking for billing compliance
- Subscription history maintained

### Legal Disclaimer
All responses include disclaimers:
- "Providing information, not legal advice"
- "Consult licensed attorney for specific situations"
- "Laws vary by jurisdiction"

## Security Best Practices Implemented

✅ **Authentication**: Secure signup/login with hashed passwords  
✅ **Authorization**: JWT-based session management  
✅ **RLS Policies**: Complete data isolation per user  
✅ **AI Confidentiality**: System prompt enforces data privacy  
✅ **Encryption**: HTTPS/TLS for all data in transit  
✅ **Input Validation**: Client and server-side validation  
✅ **Protected Routes**: Authentication required for sensitive pages  
✅ **Secure Sessions**: Persistent with automatic refresh  
✅ **No Hardcoded Secrets**: All secrets stored in environment variables  
✅ **Error Handling**: Graceful failures without exposing internals  

## Threat Mitigation

| Threat | Mitigation |
|--------|-----------|
| SQL Injection | Supabase client with parameterized queries, no raw SQL |
| XSS Attacks | React automatic escaping, no dangerouslySetInnerHTML |
| CSRF | JWT tokens in Authorization headers |
| Session Hijacking | Secure JWT storage, HTTPS only |
| Data Leakage | RLS policies, AI confidentiality rules |
| Brute Force | Rate limiting, secure password hashing |
| Privilege Escalation | RLS enforcement, JWT verification |
| Man-in-the-Middle | HTTPS/TLS encryption |

## Security Monitoring

### Recommended Practices
1. **Regular Security Audits**: Review RLS policies quarterly
2. **Dependency Updates**: Keep all packages current
3. **Log Monitoring**: Track authentication failures
4. **User Reporting**: Enable security issue reporting
5. **Penetration Testing**: Annual third-party security assessment

## Incident Response

In case of security concerns:
1. Report to development team immediately
2. Document the issue with reproduction steps
3. Isolate affected systems if necessary
4. Review logs for breach indicators
5. Update security measures as needed

## Contact

For security concerns, contact: security@legalcompass.example.com

---

**Last Updated**: 2025-01-25  
**Security Review**: Compliant with industry standards for legal tech SaaS
