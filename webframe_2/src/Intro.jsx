import React from "react";
import './Intro.css';
import { Typography, Space, Divider } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import diagramImg from "./assets/front_image.png";
import { motion } from "framer-motion";

const { Title, Paragraph, Text } = Typography;

const Intro = () => {
  return (
    <div className="intro-container">
      <div className="intro-content">
        <motion.div 
          className="text-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Space direction="vertical" size={40} style={{ width: '100%' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <Title level={1}>
                Predicting chemical ecotoxicity by learning latent space chemical representations
              </Title>
            </motion.div>

            <div className="description">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <Paragraph>
                  We developed an autoencoder model as an alternative approach for more accurate chemical ecotoxicity (HC50) prediction. Our autoencoder model effectively learned lower dimensional chemical representations from higher dimensional chemical physiochemical features and outperformed other dimension reduction methods and machine learning models.
                </Paragraph>
                <Paragraph>
                  We developed this interactive website for HC50 prediction using our trained autoencoder model. Please navigate to the Model page for HC50 prediction.
                </Paragraph>
              </motion.div>

              <motion.div 
                className="paper-section"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
              >
                <Text type="secondary" strong>RESEARCH PAPER</Text>
                <Paragraph className="paper-citation">
                  Gao F, Zhang W, Baccarelli AA, Shen Y. Predicting chemical ecotoxicity by learning latent space chemical representations. Environment International. 2022. 163:107224.
                </Paragraph>
                <div className="paper-details">
                  <Space split={<Divider type="vertical" />}>
                    <Text type="secondary">PMID: 35395577</Text>
                    <Text type="secondary">PMCID: PMC9044254</Text>
                  </Space>
                </div>
                <a 
                  href="https://doi.org/10.1016/j.envint.2022.107224"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="paper-link"
                >
                  <LinkOutlined /> View Publication
                </a>
              </motion.div>
            </div>
          </Space>
        </motion.div>

        <motion.div 
          className="image-content"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="image-card">
            <div className="image-header">
              <Text strong>Model Architecture</Text>
            </div>
            <motion.div 
              className="image-wrapper"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <img src={diagramImg} alt="Model Architecture Diagram" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Intro;
