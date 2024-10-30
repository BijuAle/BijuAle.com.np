---
title: Classification of Galaxies with Machine Laearning
tags: ["post", "Computing", "Science"]
date: 2018-01-01
---

The notion of colour sends a philosopher pondering about its ontology and the relation with the mind, while the impressionists akin to Monet, are busy evoking awe in the play with the pigments. And there are the astronomers who have precisely defined colours in terms of the electromag- netic spectrum1 of light. Alex Filippenko, the professor of astronomy at UC Berkeley put it aptly; light is the supreme informant, a goldmine for astronomers. Its colours are the embedded knowledge of the celestial bodies

Light from distant galaxies offers a wealth of information, including redshift and morphology. However, traditional spectroscopic methods, which rely on precise wavelength measurements of specific elements, are impractical for the vast number of galaxies in the universe. In many cases, spectroscopic data is simply unavailable.

To address this challenge, we propose a machine learning approach. I trained a Decision Tree regression classifier on a dataset of galaxies, using five-band color indices as input features and photometric redshifts as the target variable. The model's performance was evaluated using the median residual method and 10-fold cross-validation. My results demonstrate that the model effectively predicts photometric redshifts, with median residuals of approximately 0.074 for quasars and 0.016 for galaxies.

Additionally, I explored the use of spectral flux data to predict galaxy morphology. A Decision Tree classifier achieved an accuracy of 80% in classifying galaxies into morphological types. By employing Ensemble Learning techniques like Random Forest, I further improved accuracy by 6-7%

Full report:

[Codes] (https://github.com/BijuAle/computing_dissertation)
