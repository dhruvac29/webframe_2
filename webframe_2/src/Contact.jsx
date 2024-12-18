import React from "react";
import { Form, Input, Button, notification } from "antd";
import {
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import "./Contact.css";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

const ContactUsPage = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const templateParams = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      message: values.message,
    };

    emailjs
      .send(
        "service_nr8x0ck", // Replace with your EmailJS service ID
        "template_nl1w2yc", // Replace with your EmailJS template ID
        templateParams,
        "jgUMKd3f3K9AHh2M2" // Replace with your EmailJS user ID
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        notification.success({
          message: "Form Submitted",
          description: "Your message has been sent successfully!",
        });
        form.resetFields();
      })
      .catch((error) => {
        console.log("FAILED...", error);
        notification.error({
          message: "Form Submission Failed",
          description: "Please check the form fields and try again.",
        });
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    notification.error({
      message: "Form Submission Failed",
      description: "Please check the form fields and try again.",
    });
  };

  return (
    <motion.div
      className="contact-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="contact-content" variants={itemVariants}>
        <motion.h2 className="contact-title" variants={itemVariants}>
          Get in touch with us
        </motion.h2>
        <motion.div className="contact-info" variants={itemVariants}>
          <motion.p variants={itemVariants}>
            <h3>Dr. Yike Shen</h3>
            <MailOutlined />{" "}
            <a href="mailto:yike.shen@uta.edu">yike.shen@uta.edu</a>
            <br />
            Department of Earth and Environmental Sciences
            <br />
            <EnvironmentOutlined /> University of Texas at Arlington
          </motion.p>
          <motion.p variants={itemVariants}>
            <h3>Dr. Feng Gao</h3>
            <MailOutlined />{" "}
            <a href="mailto:gaofeng@ucla.edu">gaofeng@ucla.edu</a>
            <br />
            Department of Environmental Health Sciences
            <br />
            Department of Molecular and Medical Pharmacology
            <br />
            <EnvironmentOutlined /> University of California, Los Angeles
          </motion.p>
        </motion.div>
        <motion.div className="contact-form" variants={itemVariants}>
          <Form
            form={form}
            name="contact"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "Please enter your first name" },
              ]}
            >
              <Input placeholder="First name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please enter your last name" },
              ]}
            >
              <Input placeholder="Last name" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email Address"
              rules={[
                {
                  required: true,
                  message: "Please enter your email address",
                  type: "email",
                },
              ]}
            >
              <Input placeholder="Email address" />
            </Form.Item>
            <Form.Item
              name="message"
              label="Message"
              rules={[{ required: true, message: "Please enter your message" }]}
            >
              <Input.TextArea placeholder="I'm interested in learning more about..." />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#2c2c2c", borderColor: "#2c2c2c" }}
              >
                Send
              </Button>
            </Form.Item>
          </Form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactUsPage;
