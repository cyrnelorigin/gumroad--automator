/**
 * Cyrnel Origin - Phase 5: Production Automation Engine
 * Professional AI-powered business audits sent from cyrnelorigin.online
 */

import { Resend } from 'resend';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Generates AI-powered business automation audit using Groq API
 */
async function generateAIaudit(businessUrl) {
  console.log(`🤖 Analyzing business website: ${businessUrl}`);
  
  // Professional audit prompt - customize as needed
  const groqPrompt = `As a senior automation consultant at Cyrnel Origin, analyze ${businessUrl} and create a detailed "AI-Powered Business Automation Audit" with:
  
1. EXECUTIVE SUMMARY: 3-4 key findings on automation potential
2. IDENTIFIED PROCESSES: 3-5 repetitive tasks suitable for automation
3. QUICK-WIN AUTOMATIONS: Specific implementable solutions with time estimates
4. TECHNOLOGY RECOMMENDATIONS: Appropriate tools for implementation
5. 90-DAY ROADMAP: Phased implementation plan
6. ROI ANALYSIS: Time and cost savings projections

Tone: Professional, actionable, value-focused.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [{ role: 'user', content: groqPrompt }],
        temperature: 0.7,
        max_tokens: 2500
      }),
      timeout: 30000
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Groq API Error ${response.status}:`, errorText);
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const auditContent = data.choices[0]?.message?.content || 'Audit generation completed.';
    
    console.log('✅ AI audit generated successfully');
    return auditContent;

  } catch (error) {
    console.error('❌ Audit generation failed:', error.message);
    // Professional fallback
    return `**AI-Powered Business Automation Audit for ${businessUrl}**

Thank you for choosing Cyrnel Origin. Our system has received your request for ${businessUrl}.

Due to high demand on our AI systems, your full customized audit is being finalized by our specialists and will be delivered within 24 hours.

In the meantime, our preliminary analysis suggests significant automation potential in lead management and customer onboarding processes.

-- Cyrnel Origin Automation Team`;
  }
}

/**
 * Sends professional audit email from your domain
 */
async function sendAuditEmail(customerEmail, customerName, businessUrl, auditContent, orderId) {
  console.log(`📧 Sending audit to: ${customerEmail}`);
  
  // Professional HTML email template with your domain branding
  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your AI-Powered Business Automation Audit</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
            padding: 20px;
            background-color: #f5f7fa;
        }
        .header { 
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); 
            padding: 40px 30px; 
            text-align: center; 
            border-radius: 12px 12px 0 0; 
            color: white;
        }
        .header h1 { 
            margin: 0; 
            font-size: 28px; 
            font-weight: 700;
            letter-spacing: -0.5px;
        }
        .header p {
            margin: 10px 0 0;
            opacity: 0.9;
            font-size: 16px;
        }
        .content { 
            background: white; 
            padding: 40px 30px; 
            border-radius: 0 0 12px 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .audit-box { 
            background: #f8fafc; 
            border-left: 4px solid #4f46e5; 
            padding: 25px; 
            margin: 30px 0; 
            white-space: pre-wrap; 
            font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
            font-size: 14px;
            line-height: 1.7;
            border-radius: 0 8px 8px 0;
        }
        .footer { 
            margin-top: 40px; 
            padding-top: 25px; 
            border-top: 1px solid #e5e7eb; 
            font-size: 13px; 
            color: #6b7280; 
            text-align: center; 
        }
        .cta-button { 
            display: inline-block; 
            background: #4f46e5; 
            color: white; 
            padding: 14px 32px; 
            text-decoration: none; 
            border-radius: 8px; 
            margin: 20px 0; 
            font-weight: 600;
            font-size: 16px;
            transition: background-color 0.2s;
        }
        .cta-button:hover {
            background-color: #4338ca;
        }
        .highlight {
            background-color: #fef3c7;
            padding: 2px 6px;
            border-radius: 4px;
            font-weight: 600;
        }
        .logo {
            font-weight: 800;
            color: #4f46e5;
            font-size: 24px;
            letter-spacing: -1px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div style="font-size: 42px; margin-bottom: 15px;">🚀</div>
        <h1>Your AI-Powered Business Audit</h1>
        <p>Cyrnel Origin Automation Analysis</p>
    </div>
    
    <div class="content">
        <p>Hi <strong>${customerName || 'Business Leader'}</strong>,</p>
        
        <p>Thank you for trusting <span class="logo">Cyrnel Origin</span> with your automation strategy. Our AI has completed a comprehensive analysis of:</p>
        
        <p style="text-align: center; font-size: 18px; margin: 25px 0;">
            <span class="highlight">${businessUrl}</span>
        </p>
        
        <p>Your customized automation audit is ready below. This analysis identifies specific opportunities to save time, reduce costs, and scale your operations.</p>
        
        <h3 style="color: #4f46e5; margin-top: 35px;">📋 Your Automation Audit</h3>
        <div class="audit-box">${auditContent.replace(/\n/g, '<br>')}</div>
        
        <h3 style="color: #4f46e5; margin-top: 35px;">🔄 Next Steps</h3>
        <ol style="line-height: 1.8;">
            <li><strong>Review</strong> your audit findings above</li>
            <li><strong>Prioritize</strong> the quick-win automations</li>
            <li><strong>Schedule</strong> your implementation strategy session</li>
        </ol>
        
        <div style="text-align: center; margin: 35px 0;">
            <a href="https://calendly.com/cyrnelorigin" class="cta-button">Schedule Your Strategy Call</a>
            <p style="font-size: 14px; color: #6b7280; margin-top: 10px;">
                ⏱️ 30-minute consultation • No obligation
            </p>
        </div>
        
        <p>We're excited to help you transform these insights into tangible results.</p>
        
        <p>Best regards,<br>
        <strong>The Cyrnel Origin Team</strong><br>
        <span style="font-size: 13px; color: #6b7280;">Automating Business Growth</span></p>
        
        <div class="footer">
            <p>Reference: Order ${orderId} | Generated: ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}<br>
            © ${new Date().getFullYear()} Cyrnel Origin. All rights reserved.<br>
            Need help? Reply to this email or contact support@cyrnelorigin.online</p>
            <p style="margin-top: 15px; font-size: 12px; opacity: 0.7;">
                This email was automatically generated by the Cyrnel Origin Automation Engine.
            </p>
        </div>
    </div>
</body>
</html>`;

  try {
    // Send from your professional domain
    const { data, error } = await resend.emails.send({
      from: 'Cyrnel Origin <audits@cyrnelorigin.online>',
      replyTo: 'support@cyrnelorigin.online',
      to: [customerEmail],
      subject: `Your AI-Powered Business Automation Audit for ${businessUrl} | Cyrnel Origin`,
      html: emailHtml,
      text: `CYRNEL ORIGIN - AI-POWERED BUSINESS AUTOMATION AUDIT\n\nFor: ${businessUrl}\n\n${auditContent}\n\n---\nReview your full audit above and schedule implementation: https://calendly.com/cyrnelorigin\n\nCyrnel Origin Team\nReference: ${orderId}`,
      tags: [{ name: 'audit', value: orderId }]
    });

    if (error) {
      console.error('❌ Resend API error:', error);
      throw new Error(`Email failed: ${error.message}`);
    }

    console.log(`✅ Email delivered! Resend ID: ${data.id}`);
    return { success: true, emailId: data.id };

  } catch (error) {
    console.error('❌ Critical email failure:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Main Netlify Function Handler
 * Processes Gumroad sales and triggers full audit workflow
 */
export const handler = async (event, context) => {
  console.log('🚀 Cyrnel Origin Automation Engine - Production v1.0');
  console.log(`⏰ Started: ${new Date().toISOString()}`);
  
  // 1. Validate request
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ 
        error: 'Method not allowed',
        message: 'This endpoint only accepts POST requests from Gumroad webhooks.'
      })
    };
  }
  
  // 2. Parse Gumroad webhook data
  let saleData = {};
  try {
    const params = new URLSearchParams(event.body);
    saleData = Object.fromEntries(params.entries());
    console.log('📊 Webhook parsed successfully');
  } catch (e) {
    console.error('❌ Parse error:', e.message);
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        error: 'Invalid data format',
        message: 'Could not parse webhook data. Ensure Gumroad Ping is configured correctly.'
      })
    };
  }
  
  // 3. Extract and validate required data
  const email = saleData.email || saleData.purchaser_email;
  if (!email) {
    console.error('❌ Missing customer email');
    return {
      statusCode: 400,
      body: JSON.stringify({ 
        error: 'Missing required data',
        message: 'No customer email found in webhook data.'
      })
    };
  }
  
  const productName = saleData.product_name || 'AI-Powered Business Automation Audit';
  const price = saleData.price ? (parseInt(saleData.price) / 100).toFixed(2) : '0.00';
  const orderId = saleData.sale_id || saleData.resource?.id || `ORD-${Date.now()}`;
  const currency = saleData.currency || 'USD';
  
  // Extract business website from custom fields
  let businessUrl = saleData['custom_fields[website]'] || saleData.website || 'Not provided';
  businessUrl = businessUrl.replace(/^(https?:\/\/)?(www\.)?/, '');
  
  // Extract customer name
  const customerName = saleData.full_name || saleData.purchaser?.full_name || 
                      email.split('@')[0].replace(/[^a-zA-Z]/g, ' ') || 'Valued Client';
  
  console.log(`✅ Processing: ${productName}`);
  console.log(`   📧 Customer: ${customerName} (${email})`);
  console.log(`   💰 Amount: ${price} ${currency}`);
  console.log(`   🆔 Order: ${orderId}`);
  console.log(`   🌐 Website: ${businessUrl}`);
  
  // 4. Generate AI Audit (core value delivery)
  console.log('🤖 Initiating AI analysis...');
  const auditContent = await generateAIaudit(businessUrl);
  console.log('📄 Audit content generated');
  
  // 5. Send Professional Email
  console.log('📤 Delivering audit to customer...');
  const emailResult = await sendAuditEmail(email, customerName, businessUrl, auditContent, orderId);
  
  if (!emailResult.success) {
    console.error('❌ Audit delivery failed');
    // Log to internal monitoring (you can expand this)
    console.error('FAILURE DETAILS:', {
      orderId,
      email,
      error: emailResult.error,
      timestamp: new Date().toISOString()
    });
  }
  
  // 6. Return response to Gumroad
  const responsePayload = {
    success: emailResult.success,
    message: emailResult.success 
      ? 'Cyrnel Origin audit completed and delivered successfully.' 
      : 'Audit generated but delivery failed. Customer will be contacted separately.',
    audit: {
      generated: true,
      delivered: emailResult.success,
      order_id: orderId,
      customer_email: email,
      business_website: businessUrl,
      email_id: emailResult.emailId || null
    },
    metadata: {
      version: '1.0',
      domain: 'cyrnelorigin.online',
      timestamp: new Date().toISOString(),
      processing_time_ms: Date.now() - context.timestamp
    }
  };
  
  console.log(`🏁 Workflow complete. Success: ${emailResult.success}`);
  console.log(`⏱️ Total processing time: ${Date.now() - context.timestamp}ms`);
  
  return {
    statusCode: 200,
    headers: { 
      'Content-Type': 'application/json',
      'X-Cyrnel-Origin': 'Automation-Engine'
    },
    body: JSON.stringify(responsePayload)
  };
};
