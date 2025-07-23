import React from 'react';
import { useForm } from 'react-hook-form';
import './contactForm.css';
import { DevTool } from '@hookform/devtools';

type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
    control,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    alert('Message sent successfully!');
    reset();
  };

  return (
    <div className="contact-container">
      <div className="contact-card">
        <h1 className="contact-title">Contact Us</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="contact-form" noValidate>
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="form-input"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              placeholder="Your Email"
              className="form-input"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email format',
                },
              })}
            />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </div>
          <div className="form-group">
            <label className="form-label">Message</label>
            <textarea
              placeholder="Your Message"
              className="form-input"
              {...register('message', { required: 'Message is required' })}
            />
            {errors.message && <p className="form-error">{errors.message.message}</p>}
          </div>
          <button type="submit" className="form-button">
            Send Message »
          </button>
          {isSubmitSuccessful && <p className="form-success">Thanks! We'll get back to you.</p>}
        </form>
        <DevTool control={control} />
      </div>
    </div>
  );
};

export default ContactForm;