export const bookingComformationAdmin = (bookingDetail) => {
  return `<!DOCTYPE html>
  <html>
  <head>
      <title>New Booking Has Been Made - Groove&Vibes</title>
  </head>
  <body>
      <h1>New Booking</h1>
      <p>Dear GrooveandVibes Team,</p>
      
      <p>There has been a new booking made. Please check your admin page for more information! <a href="https://grooveandvibes.com.au">Click here to view the details</a></p>

      
      <p>Booking Details:</p>
      <ul>
          <li><strong>Date:</strong> ${bookingDetail.name}</li>
          <li><strong>Date:</strong> ${bookingDetail.date}</li>
          <li><strong>Location:</strong> 491 Princes Highway Rockdale,Sydney</li>
             
      </ul>
      
      <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
      
      <p>Best regards,</p>
      <p>Groove&Vibes Team</p>
  </body>
  </html>`;
};
export const bookingComformationIndivisual = (bookingDetail) => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <title>Booking Confirmation - Groove&Vibes</title>
    </head>
    <body>
        <h1>Booking Confirmation</h1>
        <p>Dear ${bookingDetail.name},</p>
        
        <p>Thank you for booking with Groove&Vibes. We are excited to have you join us for an amazing dance experience!</p>
        
        <p>Booking Details:</p>
        <ul>
            <li><strong>Date:</strong> ${bookingDetail.date}</li>
            <li><strong>Location:</strong> 491 Princes Highway Rockdale,Sydney</li>
               
        </ul>
        
        <p>If you have any questions or need further assistance, please don't hesitate to contact us.</p>
        
        <p>Best regards,</p>
        <p>Groove&Vibes Team</p>
    </body>
    </html>`;
};
export const registrationTemplate = (registration) => {
  return `<!DOCTYPE html>
    <html>
    <head>
        <title>Registration Confirmation - Groove&Vibes</title>
    </head>
    <body>
        <h1>Registration Confirmation</h1>
        <p>Dear ${registration.name},</p>
        
        <p>Welcome to Dance and Vibes! We're thrilled to have you join our community of dancers and enthusiasts.</p>
        
        <p>Your Registration Details:</p>
        <ul>
            <li><strong>Date:</strong> ${registration.date}</li>
            <li><strong>Username:</strong> ${registration.name}</li>
            <li><strong>Email:</strong> ${registration.email}</li>
            <li><strong>Class Selected:</strong> ${registration.selectedClass}</li>
            
        </ul>
        
        <p>We look forward to sharing our passion for dance with you. If you have any questions or need assistance, feel free to reach out.</p>
        
        <p>Keep grooving and welcome aboard!</p>
        
        <p>Best regards,</p>
        <p>Groove&Vibes Team</p>
    </body>
    </html>`;
};
export const classremainingTemplete = (student) => {
  return ` <!DOCTYPE html>
    <html>
    <head>
        <title>Class Remaining Update - Groove&Vibes</title>
    </head>
    <body>
        <h1>Class Update: 2 Classes Left</h1>
        <p>Dear ${student.name},</p>
        
        <p>We hope you've been enjoying your dance course at Dance and Vibes! We wanted to remind you that you have only 2 more classes left in your current class selected.</p>
        
        <p>Class Details:</p>
        <ul>
            <li><strong>Course Name:</strong> ${student.name}</li>
            <li><strong>Course Name:</strong> ${student.email}</li>
            <li><strong>Remaining Classes:</strong> 2</li>
        </ul>
        
        <p>Keep up the great work and make the most out of your remaining classes. If you have any questions or need further information, please don't hesitate to contact us.</p>
        
        <p>Dance on and keep grooving!</p>
        
        <p>Best regards,</p>
        <p>The Groove&Vibes Team</p>
    </body>
    </html>`;
};
