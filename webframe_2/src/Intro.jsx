import React, { useState, useEffect } from "react";
import { Skeleton, Alert } from "antd";
import "./App.css"; // Import the CSS file
import diagramImg from "./assets/Picture1.png";
import NetworkImg from "./assets/Network.png";

const Intro = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="home-container">
        {!loading && (
          <Alert
            message="Website Under Construction"
            description="We're still working on this website. Some features may not be fully functional yet."
            type="info"
            showIcon
            closable
            style={{ marginBottom: "20px" }}
          />
        )}
        {loading ? (
          <Skeleton active paragraph={{ rows: 6 }} />
        ) : (
          <>
            <div className="grid-container">
              <div className="grid-item content-section">
                <p className="large-text">
                  Predicting chemical ecotoxicity by learning latent space
                  chemical representations.
                </p>
                <p className="medium-text">
                  The utilities of Ecotoxicity includes:
                </p>
                <ol className="small-text">
                  <li>
                    Autoencoder provides an alternative approach for chemical
                    ecotoxicity prediction.
                  </li>
                  <li>
                    Autoencoder-learned embeddings effectively reflected HC50
                    values.
                  </li>
                  <li>
                    Autoencoder outperformed other dimension reduction methods.
                  </li>
                  <li>
                    Autoencoder prediction results were competitive with other
                    machine learning models.
                  </li>
                </ol>
              </div>
              <div className="grid-item image-section">
                <img src={NetworkImg} className="cover-image" width="250" />
              </div>
            </div>
            <p>
              Cite us: Gao F, Zhang W, Baccarelli AA, Shen Y. Predicting
              chemical ecotoxicity by learning latent space chemical
              representations. Environment International. 2022. 163:107224.
              PMID: 35395577; PMCID: PMC9044254. DOI:{" "}
              <a href="https://www.sciencedirect.com/science/article/pii/S0160412022001507">
                https://doi.org/10.1016/j.envint.2022.107224
              </a>
            </p>
            <div className="diagram-section">
              <img src={diagramImg} className="diagram-image" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Intro;
