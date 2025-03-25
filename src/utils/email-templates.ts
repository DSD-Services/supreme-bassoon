type WorkOrderEmailData = {
  workOrderId: string;
  appointmentStart: string;
  appointmentEnd: string;
  serviceAddress: {
    addressLine1: string;
    addressLine2?: string | null;
    city: string;
    state: string;
    postalCode: string;
  };
  serviceTypeName?: string;
  reservedParts?: Array<{
    partId: number;
    partName?: string;
    manufacturer?: string | null;
    quantityReserved: number;
    quantityNeeded: number;
  }>;
  missingParts?: Array<{
    partId: number;
    partName?: string;
    manufacturer?: string | null;
    quantity: number;
  }>;
  clientName?: string;
  clientLastName?: string;
  technicianName?: string;
  technicianLastName?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  jobDetails?: string;
  appointmentNotes?: string;
  estimatedDuration?: string;
};

interface EmailTemplateOptions {
  title: string;
  headerColor: string;
  mainContent: string;
  footerContent: string;
}

// Base email template

function generateBaseEmailTemplate(options: EmailTemplateOptions): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${options.title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
        }
        .container {
          max-width: 600px;
          margin: 20px auto;
          border: 1px solid #ddd;
          border-radius: 5px;
          padding: 0;
          background-color: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: ${options.headerColor};
          color: white;
          padding: 15px 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .header h2 {
          margin: 0;
          font-size: 22px;
        }
          .logo {
          max-height: 40px;
          margin-bottom: 15px;
        }
        .content {
          padding: 20px;
        }
        .footer {
          background-color: #f5f5f5;
          padding: 15px 20px;
          text-align: center;
          border-radius: 0 0 5px 5px;
          font-size: 12px;
          color: #666;
          border-top: 1px solid #ddd;
        }
        .details {
          background-color: #f0f4f9;
          padding: 15px;
          border-radius: 5px;
          margin-bottom: 20px;
        }
        .details p {
          margin: 5px 0;
        }
        .thank-you {
          text-align: center;
          font-weight: bold;
          margin: 20px 0;
        }
        .reserved-parts {
          background-color:rgb(217, 255, 211);
          border-left: 4px solid rgb(36, 255, 7);
          padding: 10px 15px;
          margin: 15px 0;
          border-radius: 0 5px 5px 0;
        }
        .missing-parts {
          background-color: #fff3cd;
          border-left: 4px solid #ffc107;
          padding: 10px 15px;
          margin: 15px 0;
          border-radius: 0 5px 5px 0;
        }
        .missing-parts.admin {
          background-color: #f8d7da;
          border-left: 4px solid #dc3545;
        }
        .reserved-parts h3 {
          color:rgb(39, 114, 28);
          margin-top: 0;
        }
        .missing-parts h3 {
          color: #721c24;
          margin-top: 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 15px 0;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        th {
          background-color: #f2f2f2;
        }
        .action-needed {
          font-weight: bold;
          text-align: center;
          margin: 20px 0;
          color: #721c24;
        }
        ul {
          margin: 10px 0;
          padding-left: 20px;
        }
        .section {
          margin-bottom: 20px;
        }
        .section-title {
          font-weight: bold;
          margin-bottom: 5px;
          border-bottom: 1px solid #eee;
          padding-bottom: 5px;
        }
        .job-section-gap {
          margin-bottom: 35px;
        }
        .client-info p, .job-details p {
          margin: 5px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>${options.title}</h2>
        </div>
        
        <div class="content">
          ${options.mainContent}
        </div>
        
        <div class="footer">
          <p>${options.footerContent}</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Formats date and time range for email templates
function formatDateTimeRange(
  start: string,
  end: string,
): { date: string; time: string } {
  try {
    const startDate = new Date(start);
    const endDate = new Date(end);

    // Format the date
    const date = startDate.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // Format the time range
    const startTime = startDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    const endTime = endDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return {
      date,
      time: `${startTime} - ${endTime}`,
    };
  } catch {
    return {
      date: "Date not available",
      time: `${start} - ${end}`,
    };
  }
}

// Service details section for client emails
function generateServiceDetails(data: WorkOrderEmailData): string {
  const { date, time } = formatDateTimeRange(
    data.appointmentStart,
    data.appointmentEnd,
  );

  return `
    <div class="details">
      <p><strong>Service Type:</strong> ${data.serviceTypeName || "General Service"}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>
      ${data.technicianName ? `<p><strong>Technician:</strong> ${data.technicianName}</p>` : ""}
      ${data.estimatedDuration ? `<p><strong>Estimated Duration:</strong> ${data.estimatedDuration}</p>` : ""}
      ${data.appointmentNotes ? `<p><strong>Service Request:</strong> ${data.appointmentNotes}</p>` : ""}
    </div>
  `;
}

// Format service address

function formatAddress(address: WorkOrderEmailData["serviceAddress"]): string {
  return `${address.addressLine1}${
    address.addressLine2 ? `, ${address.addressLine2}` : ""
  }, ${address.city}, ${address.state} ${address.postalCode}`;
}

// Reserved parts section for technician email

function generateReservedPartsSection(data: WorkOrderEmailData): string {
  if (!data.reservedParts || data.reservedParts.length === 0) {
    return "<p><strong>Please refer to your dashboard for Reserved Parts information for this work order.</strong></p>";
  }

  return `
      <div class="reserved-parts">
        <h3>Reserved Parts for ${data.serviceTypeName}</h3>
        <table>
          <thead>
            <tr>
              <th>Part</th>
              <th>Quantity Needed</th>
              <th>Quantity Reserved</th>
              <th>Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            ${data.reservedParts
              .map(
                (part) => `
              <tr>
                <td>${part.partName || `Part ${part.partId}`}</td>
                <td>${part.quantityNeeded}</td>
                <td>${part.quantityReserved}</td>
                <td>${part.manufacturer || "N/A"}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
}

// Missing parts section for technician email

function generateMissingPartsSection(
  data: WorkOrderEmailData,
  isAdmin: boolean = false,
): string {
  if (!data.missingParts || data.missingParts.length === 0) {
    return "<p><strong>All required parts are available.</strong></p>";
  }

  if (isAdmin) {
    return `
      <div class="missing-parts admin">
        <h3>Missing Parts</h3>
        <table>
          <thead>
            <tr>
              <th>Part</th>
              <th>Quantity Missing</th>
              <th>Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            ${data.missingParts
              .map(
                (part) => `
              <tr>
                <td>${part.partName || `Part ${part.partId}`}</td>
                <td>${part.quantity}</td>
                <td>${part.manufacturer || "N/A"}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
      <p class="action-needed">Please arrange for these parts to be ordered or allocated as soon as possible.</p>
    `;
  } else {
    return `
      <div class="missing-parts">
        <h3>Missing Parts</h3>
        <table>
          <thead>
            <tr>
              <th>Part</th>
              <th>Quantity Needed</th>
              <th>Manufacturer</th>
            </tr>
          </thead>
          <tbody>
            ${data.missingParts
              .map(
                (part) => `
              <tr>
                <td>${part.partName || `Part ${part.partId}`}</td>
                <td>${part.quantity}</td>
                <td>${part.manufacturer || "N/A"}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
      </div>
    `;
  }
}

// HTML email template for client confirmation

export function generateClientEmailTemplate(data: WorkOrderEmailData): {
  subject: string;
  html: string;
} {
  const subject = `DSD Services - Appointment Confirmation`;

  const mainContent = `
    <p>Your ${data.serviceTypeName || "service"} appointment with DSD Services</p>

    <p>Hello ${data.clientName || "Valued Customer"},</p>
    
    <p>Thank you for choosing DSD Services. We're pleased to confirm that your request for ${data.serviceTypeName || "service"} has been accepted and scheduled.</p>
    
    <h3>Service Details</h3>
    ${generateServiceDetails(data)}
    
    <p>${data.technicianName || "Your assigned technician"}${data.technicianLastName ? ` ${data.technicianLastName.charAt(0)}` : ""}. will arrive at your location during the scheduled time.</p>
    
    <p class="thank-you">Thank you for your business!</p>
  `;

  const footerContent = `
    If you need to reschedule or have any questions, please contact us at support@dsdservices.com.<br>
    Visit <a href="${process.env.NEXT_PUBLIC_API_URL}/dashboard">your dashboard</a> to manage all your appointments.<br>
    We look forward to seeing you soon, The DSD Services Team
  `;

  const html = generateBaseEmailTemplate({
    title: "DSD Services - Appointment Confirmation",
    // logoUrl: `http://localhost:3000/images/dsd-house-white.png`,
    headerColor: "#4a6fdc",
    mainContent,
    footerContent: footerContent,
  });

  return { subject, html };
}

// HTML email template for technician notification

export function generateTechnicianEmailTemplate(data: WorkOrderEmailData): {
  subject: string;
  html: string;
} {
  const subject = `DSD Services - New Work Order Assigned`;
  const { date, time } = formatDateTimeRange(
    data.appointmentStart,
    data.appointmentEnd,
  );

  const mainContent = `
     <p>Hello ${data.technicianName || "Technician"}${data.technicianLastName ? ` ${data.technicianLastName.charAt(0)}` : ""}.,</p>

    <p>You have been assigned a new work order.</p>
    
    <div class="section">
      <p><strong>Service Type:</strong> ${data.serviceTypeName || "General Service"}</p>
      <p><strong>Appointment Date:</strong> ${date}</p>
      <p><strong>Appointment Time:</strong> ${time}</p>
    </div>
    
    <div class="section">
      <div class="section-title">Client Information</div>
      <div class="client-info">
        <p><strong>Name:</strong> ${data.clientName || ""} ${data.clientLastName || ""}</p>
        <p><strong>Address:</strong> ${formatAddress(data.serviceAddress)}</p>
        ${data.primaryPhone ? `<p><strong>Phone:</strong> ${data.primaryPhone}</p>` : ""}
        ${data.secondaryPhone ? `<p><strong>Alternative Phone:</strong> ${data.secondaryPhone}</p>` : ""}
      </div>
    </div>
    
    ${
      data.jobDetails || data.appointmentNotes
        ? `
      <div class="sectio job-section-gap">
        <div class="section-title">Job Details</div>
        <div class="job-details">
          <p>${data.jobDetails || data.appointmentNotes || ""}</p>
        </div>
      </div>
    `
        : ""
    }

    ${generateReservedPartsSection(data)}
    
    ${generateMissingPartsSection(data)}
    
    ${
      data.appointmentNotes && !data.jobDetails
        ? `
      <div class="section">
        <div class="section-title">Additional Notes</div>
        <p>${data.appointmentNotes}</p>
      </div>
    `
        : ""
    }
    
    <p>Please arrive at the service location within the scheduled time window.</p>
  `;

  const footerContent = `
    If you have any questions, please contact your supervisor.<br>
    Access <a href="${process.env.NEXT_PUBLIC_API_URL}/dashboard">your work order dashboard</a> for more details.
  `;

  const html = generateBaseEmailTemplate({
    title: "DSD Services - New Work Order Assigned",
    // logoUrl: `http://localhost:3000/images/dsd-house-white.png`,
    headerColor: "#2b8a3e",
    mainContent,
    footerContent: footerContent,
  });

  return { subject, html };
}

// HTML email template for admin missing parts alert

export function generateAdminMissingPartsTemplate(data: WorkOrderEmailData): {
  subject: string;
  html: string;
} {
  if (!data.missingParts || data.missingParts.length === 0) {
    throw new Error(
      "Cannot generate missing parts email without missing parts data",
    );
  }

  const subject = `DSD Services - Missing Parts Alert for Work Order #${data.workOrderId}`;

  const mainContent = `
    <p>The following work order requires parts that are not currently in stock:</p>
    
    <div class="section">
      <p><strong>Work Order #:</strong> ${data.workOrderId}</p>
      <p><strong>Service Type:</strong> ${data.serviceTypeName || "General Service"}</p>
      <p><strong>Service Address:</strong> ${formatAddress(data.serviceAddress)}</p>
      <p><strong>Appointment Date:</strong> ${formatDateTimeRange(data.appointmentStart, data.appointmentEnd).date}</p>
      <p><strong>Appointment Time:</strong> ${formatDateTimeRange(data.appointmentStart, data.appointmentEnd).time}</p>
      ${data.technicianName ? `<p><strong>Assigned Technician:</strong> ${data.technicianName} ${data.technicianLastName || ""}</p>` : ""}
      ${data.clientName ? `<p><strong>Client:</strong> ${data.clientName} ${data.clientLastName || ""}</p>` : ""}
    </div>
    
    ${generateMissingPartsSection(data, true)}
    
    <p>Please process this request promptly to avoid service delays.</p>
  `;

  const footerContent = `
    This is an automated alert from the DSD Services work order management system.<br>
    <a href="${process.env.NEXT_PUBLIC_API_URL}/admin/inventory">Manage inventory</a> | 
    <a href="${process.env.NEXT_PUBLIC_API_URL}/admin/work-orders/${data.workOrderId}">View work order details</a>
  `;

  const html = generateBaseEmailTemplate({
    title: "DSD Services - Missing Parts Alert",
    // logoUrl: `http://localhost:3000/images/dsd-house-white.png`,
    headerColor: "#f59e0b",
    mainContent,
    footerContent: footerContent,
  });

  return { subject, html };
}

type CreateUserEmailData = {
  email: string;
  password: string;
  role: "CLIENT" | "TECHNICIAN";
};

export function generateCreateUserEmail(data: CreateUserEmailData): {
  subject: string;
  html: string;
} {
  const subject = `DSD Services - Welcome! New ${data.role === "CLIENT" ? "Client" : "Technician"} Registration`;

  const mainContent = `
    <h2>Welcome to DSD Services!</h2>
    <p>Your account has been successfully created. Below are your login details:</p>
    <div class="details">
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Password:</strong> ${data.password}</p>
    </div>
    <p>Please log in to your account and change your password for security reasons.</p>
    <p><a href="${process.env.NEXT_PUBLIC_API_URL}/login">Click here to log in</a></p>
    `;

  const footerContent = `
    <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
    <p class="thank-you">Thank you for choosing DSD Services!</p>
  `;

  const html = generateBaseEmailTemplate({
    title: "DSD Services - Welcome to DSD Services!",
    // logoUrl: `http://localhost:3000/images/dsd-house-white.png`,
    headerColor: data.role === "CLIENT" ? "#14532d" : "#7c2d12",
    mainContent,
    footerContent: footerContent,
  });

  return { subject, html };
}

/**
 * Helper to send email using the mailer API
 */
export async function sendEmail(
  to: string,
  subject: string,
  html: string,
): Promise<Response> {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/mailer`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to,
      subject,
      html,
    }),
  });
}
