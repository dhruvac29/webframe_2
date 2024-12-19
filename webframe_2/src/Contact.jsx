import React from "react";
import { Form, Input, Button, notification, Card, Typography } from "antd";
import {
  MailOutlined,
  EnvironmentOutlined,
  SendOutlined,
  UserOutlined,
  MessageOutlined
} from "@ant-design/icons";
import emailjs from "emailjs-com";
import { motion } from "framer-motion";
import "./Contact.css";

const { Title, Text } = Typography;
const { TextArea } = Input;

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
        "service_nr8x0ck",
        "template_nl1w2yc",
        templateParams,
        "jgUMKd3f3K9AHh2M2"
      )
      .then((response) => {
        console.log("SUCCESS!", response.status, response.text);
        notification.success({
          message: "Message Sent!",
          description: "We'll get back to you soon.",
          placement: 'bottomRight',
        });
        form.resetFields();
      })
      .catch((error) => {
        console.log("FAILED...", error);
        notification.error({
          message: "Failed to Send",
          description: "Please try again later.",
          placement: 'bottomRight',
        });
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
        <motion.div 
          className="contact-title"
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
        >
          <Title level={1}>Get in touch with us</Title>
        </motion.div>

        <motion.div className="contact-info" variants={itemVariants}>
          <Card className="contact-card">
            <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400 }}>
              <Title level={3}>Dr. Yike Shen</Title>
              <div className="contact-detail">
                <MailOutlined className="icon" />
                <Text><a href="mailto:yike.shen@uta.edu">yike.shen@uta.edu</a></Text>
              </div>
              <div className="contact-detail">
                <EnvironmentOutlined className="icon" />
                <Text>
                  Department of Earth and Environmental Sciences
                  <br />
                  University of Texas at Arlington
                </Text>
              </div>
            </motion.div>
          </Card>

          <Card className="contact-card">
            <motion.div whileHover={{ scale: 1.01 }} transition={{ type: "spring", stiffness: 400 }}>
              <Title level={3}>Dr. Feng Gao</Title>
              <div className="contact-detail">
                <MailOutlined className="icon" />
                <Text><a href="mailto:gaofeng@ucla.edu">gaofeng@ucla.edu</a></Text>
              </div>
              <div className="contact-detail">
                <EnvironmentOutlined className="icon" />
                <Text>
                  Department of Environmental Health Sciences
                  <br />
                  Department of Molecular and Medical Pharmacology
                  <br />
                  University of California, Los Angeles
                </Text>
              </div>
            </motion.div>
          </Card>
        </motion.div>

        <motion.div className="contact-form" variants={itemVariants}>
          <Card className="form-card">
            <Form
              form={form}
              name="contact"
              layout="vertical"
              onFinish={onFinish}
            >
              <Form.Item
                name="firstName"
                rules={[{ required: true, message: "Please enter your first name" }]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="First name" 
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="lastName"
                rules={[{ required: true, message: "Please enter your last name" }]}
              >
                <Input 
                  prefix={<UserOutlined />} 
                  placeholder="Last name" 
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email address",
                    type: "email",
                  },
                ]}
              >
                <Input 
                  prefix={<MailOutlined />} 
                  placeholder="Email address" 
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="message"
                rules={[{ required: true, message: "Please enter your message" }]}
              >
                <TextArea 
                  prefix={<MessageOutlined />}
                  placeholder="I'm interested in learning more about..." 
                  rows={4}
                  size="large"
                />
              </Form.Item>
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<SendOutlined />}
                  size="large"
                >
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactUsPage;
