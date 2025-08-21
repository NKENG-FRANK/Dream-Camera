import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage(
        "Thank you for your message! We'll get back to you within 24 hours."
      );
      setFormData({ name: "", email: "", subject: "", message: "" });
      setIsSubmitting(false);

      // Clear success message after 5 seconds
      setTimeout(() => {
        setSubmitMessage("");
      }, 5000);
    }, 1500);
  };

  return (
    <div className="contact-page">
      {/* Contact Hero */}
      <section className="contact-hero">
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <h1 className="hero-title">Get In Touch</h1>
              <p className="hero-subtitle">
                Have questions about our cameras or need expert advice? We're
                here to help you capture your perfect shot.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="contact-content py-5">
        <div className="container">
          <div className="row">
            {/* Contact Form */}
            <div className="col-lg-8 mb-5">
              <div className="contact-form-wrapper">
                <h2 className="section-title">Send Us a Message</h2>

                {submitMessage && (
                  <div className="alert alert-success" role="alert">
                    {submitMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">
                      Subject *
                    </label>
                    <select
                      className="form-select"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="product-inquiry">Product Inquiry</option>
                      <option value="technical-support">
                        Technical Support
                      </option>
                      <option value="warranty">Warranty Claim</option>
                      <option value="shipping">Shipping & Returns</option>
                      <option value="partnership">
                        Partnership Opportunities
                      </option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="message" className="form-label">
                      Message *
                    </label>
                    <textarea
                      className="form-control"
                      id="message"
                      name="message"
                      rows="6"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg submit-btn"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-lg-4">
              <div className="contact-info">
                <h3>Contact Information</h3>

                <div className="info-item">
                  <div className="info-icon">📍</div>
                  <div className="info-content">
                    <h5>Visit Our Store</h5>
                    <p>
                      123 Photography Street
                      <br />
                      Camera District
                      <br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">📞</div>
                  <div className="info-content">
                    <h5>Call Us</h5>
                    <p>
                      <strong>Sales:</strong> (555) 123-4567
                      <br />
                      <strong>Support:</strong> (555) 123-4568
                      <br />
                      <small className="text-muted">Mon-Fri: 9AM-6PM EST</small>
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">✉️</div>
                  <div className="info-content">
                    <h5>Email Us</h5>
                    <p>
                      <strong>General:</strong> info@camerapro.com
                      <br />
                      <strong>Support:</strong> support@camerapro.com
                      <br />
                      <strong>Sales:</strong> sales@camerapro.com
                    </p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="info-icon">🕒</div>
                  <div className="info-content">
                    <h5>Store Hours</h5>
                    <p>
                      <strong>Monday - Friday:</strong> 9:00 AM - 7:00 PM
                      <br />
                      <strong>Saturday:</strong> 10:00 AM - 6:00 PM
                      <br />
                      <strong>Sunday:</strong> 12:00 PM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="faq-section mt-5">
                <h4>Frequently Asked Questions</h4>
                <div className="accordion" id="faqAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq1"
                      >
                        What's your return policy?
                      </button>
                    </h2>
                    <div
                      id="faq1"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        We offer a 30-day return policy for all cameras in
                        original condition with original packaging.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq2"
                      >
                        Do you offer international shipping?
                      </button>
                    </h2>
                    <div
                      id="faq2"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        Yes, we ship worldwide. Shipping costs and delivery
                        times vary by location.
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#faq3"
                      >
                        What warranty do you provide?
                      </button>
                    </h2>
                    <div
                      id="faq3"
                      className="accordion-collapse collapse"
                      data-bs-parent="#faqAccordion"
                    >
                      <div className="accordion-body">
                        All cameras come with manufacturer warranty plus our
                        additional 2-year extended warranty option.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container-fluid p-0">
          <div className="map-placeholder">
            <div className="map-content">
              <h4>Find Our Store</h4>
              <p>
                Visit us in person to see our cameras up close and get expert
                advice from our team.
              </p>
              <button className="btn btn-primary">Get Directions</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
