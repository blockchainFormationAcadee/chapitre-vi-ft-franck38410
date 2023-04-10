# Projet Web3
Ce projet a pour objectif de créer une plateforme de collection et d’échange de NFTs liée aux Jeux Olympiques d'été de 2024 à Paris.

Dans ce repository vous trouverez sous JO2024 le code du backend et du frontend :
- backend : on retrouve le Smart Contrat développés en Solidity, testés et déployés sur la blockchain de test Hardhat et Mumbai à l’aide de l’environnement Hardhat.
- frontend : Le Frontend (dapp) utilise la librairie React JS et le framework Next JS.

## backend
Création d'une collection NFT ERC-1155 (fongigle et non fongible) dédiée au JO 2024 :

- Création d'un smart contrat spécifique.
- Utilisation de https://nft.storage pour héberger les metadatas et les images.

## frontend
Création de l'application (dapp) qui permet d'intéragir avec le backend.
              Utilise la librairie React JS et le framework Next JS.
              Pour le design le fronted s’appuie sur Chakra UI.
              Le composant Rainbowkit permet se connecter au Wallet de l’utilisateur 
              Wagmi pour la librairie de hooks Ethereum.

## Installation - pré-requis du backend
- npm 8.1.0
- node v16.13.0
- yarn 1.22.19
  npm install --global yarn
- hardhat v2.13.0 
  yarn add --dev hardhat
- plugins : 
    - hardhat-etherscan : pour valider le contrat sur etherscan
      npm install --save-dev hardhat-etherscan
    - hardhat-gas-reporter : pour connaitre le montant des gaz lors de la création du contrat et des appels des fonctions
      npm install --save-dev hardhat-gas-reporter
    - solidity-coverage : pour connaitre la couverture de code par les tests
      npm install --save-dev solidity-coverage
    - hardhat-deploy : pour déployer facilement des contrats sur différents réseaux
      npm install --save-dev hardhat-deploy
- compilation
  npx hardhat compile
- lancement des tests + rapport gaz
  npx hardhat compile
- couverture de code (=> ./coverage/index.html)
  npx hardhat coverage

- Ajouter un fichier .env avec les paramètres renseignés :
    MUMBAI_RPC_URL=https://polygon-mumbai.g.alchemy.com/v2/[TODO]
    SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/[TODO]
    MAINNET_RPC_URL=https://[TODO]
    PRIVATE_KEY=[TODO]
    COINMARKETCAP_API_KEY=[TODO]
    ETHERSCAN_API_KEY=[TODO]

## Déploiement

- Déploiement sur le réseau Mumbai
  npx hardhat run --network mumbai
- Vérification Etherscan
  npx hardhat verify --network mumbai [adresse contrat sur Mumbai]
