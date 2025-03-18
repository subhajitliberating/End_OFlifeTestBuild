import React from "react";
// Import the CSS file for styling

const ContactUs = () => {
  return (
    <div className="cus-mt-170">
    <div className="contact-container">
      <h1 className="text-center mb-4">Contact Us</h1>

      <section className="mb-5">
        <h2>Get in Touch</h2>
        <p>
          If you have any questions, concerns, or feedback, please feel free to contact us using the
          information below.
        </p>
      </section>

      <section className="mb-5">
        <h2>Contact Information</h2>
        <ul>
          <li>
            <strong>Email:</strong> <a href="mailto:info@endoflife.ie">info@endoflife.ie</a>
          </li>
          <li>
            <strong>Phone:</strong> +353 1 234 5678
          </li>
          <li>
            <strong>Address:</strong> 24-28 Tara Street, Dublin 2, Ireland
          </li>
        </ul>
      </section>

      <section className="mb-5">
        <h2>Send Us a Message</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input type="text" className="form-control" id="name" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="email" required />
          </div>
          <div className="mb-3">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea className="form-control" id="message" rows="5" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </section>
    </div>
    </div>
  );
};

export default ContactUs;