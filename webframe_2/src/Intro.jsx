import React from "react";
import './Intro.css';
import { Skeleton, Alert } from "antd";
import "./App.css"; // Import the CSS file
import diagramImg from "./assets/front_image.png";
import NetworkImg from "./assets/Network.png";
import { motion } from "framer-motion";

const Intro = () => {
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

  return (
    <motion.div
      className="home-container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="grid-container" variants={itemVariants}>
        <motion.div className="grid-item content-section" variants={itemVariants}>
          <motion.h1 className="large-text" variants={itemVariants}>
            Predicting chemical ecotoxicity by learning latent space chemical representations.
          </motion.h1>
          <motion.p className="small-text" variants={itemVariants}>
            We developed an autoencoder model as an alternative approach for more accurate chemical ecotoxicity (HC50) prediction. Our autoencoder model effectively learned lower dimensional chemical representations from higher dimensional chemical physiochemical features and outperformed other dimension reduction methods and machine learning models.
          </motion.p>
          <motion.p className="small-text" variants={itemVariants}>
            We developed this interactive website for HC50 prediction using our trained autoencoder model. Please navigate to the Model page for HC50 prediction.
          </motion.p>
          <motion.p className="small-text" variants={itemVariants}>
            To learn more, please read our paper: Gao F, Zhang W, Baccarelli AA, Shen Y. Predicting chemical ecotoxicity by learning latent space chemical representations. Environment International. 2022. 163:107224. PMID: 35395577; PMCID: PMC9044254. DOI:{" "}
            <a href="https://www.sciencedirect.com/science/article/pii/S0160412022001507">
              https://doi.org/10.1016/j.envint.2022.107224
            </a>
          </motion.p>
        </motion.div>
      </motion.div>
      <motion.div 
        className="diagram-section"
        variants={itemVariants}
      >
        <motion.img
          src={diagramImg}
          className="diagram-image"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Intro;
