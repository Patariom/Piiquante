# Piiquante

<img width="713" alt="ImageWebsite" src="https://user-images.githubusercontent.com/106959664/205670884-8f3856d2-3d2e-4170-b6a0-1d155dd85a80.PNG">

## English

(click on the link to go directly to the [french version](#français))

*This work is the 6th project of OpenClassrooms Web Developer training.*
This repo contains the backend of Hot Takes web app. Hot Takes is an application, developped for the brand Piiquante, that allows users to upload and rate spicy sauces.


### Requirements
To get this project to work, you should have the following program installed :

:arrow_right: Node V18.12+ (you can download it on [Node Website](https://nodejs.org/en/))


### How to install

:one: Create a folder for this project

:two: Clone via the following link the [frontend Repo](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6) into a frontend folder

:three: Clone this repo into a backend folder

:four: Open a terminal and go to your frontend folder, 
```
cd frontend
````
then type the following instructions :
```
npm install
npm start
````
The frontend will run on [http://localhost:4200](http://localhost:4200)

:five: Open a second terminal and go to your backend folder,
```
cd backend
````
then type the following instructions :
```
npm install
nodemon server
````
The backend will run on [http://localhost:3000](http://localhost:3000)

:six: Create a .env file in the root of the projet (for security reason, the real file isn't on this repo, you'll have to create your one)
```
touch .env
````
:seven: Set the MongoDB Database : Create a cluster on MongoDb, then an user (please keep the password). Go in Network Access and select "Add IP Adress", then : "Add access from Anywhere"

:eight: Copy the text in env.example file and paste it your own .env file. Then change the MONGODB_URI by your own connect link (accessible from "Connect", then "Connect your application"). Please make you replace the username and password by your own.

:nine: Change the JWT_SECRET_TOKEN by your own Token (make sure it's complex enough).

You're all set !

_______________________________________________________
## Français

(click on the link to go directly to the [english version](#english))

*Ce travail a été réalisé pour le Projet 6 de la formaiton Développeur Web d'OpenClassrooms.*
Ce repo contient uniquement le backend de l'application web Hot Takes. Hot Takes est une application, développée pour la marque de sauces Piiquante, qui propose 
aux utilisateurs de télécharger et de noter des sauces piquantes.


### Pré-requis 
Pour faire fonctionner ce projet, vous devez installer le programme suivant :

:arrow_right: Node V18.12+ (vous pouvez le télécharger sur le [site de Node](https://nodejs.org/en/))


### Installation

:one: Créez un dossier pour ce projet

:two: Clonez, via le lien suivant, le [repo frontend](https://github.com/OpenClassrooms-Student-Center/Web-Developer-P6) dans un dossier frontend

:three: Clonez ce repo dans un dossier backend

:four: Ouvrez un terminal et positionnez-vous dans votre dossier frontend,
```
cd frontend
````
puis tapez les instructions suivantes :
```
npm install
npm start
````
Le frontend s'exécutera sur [http://localhost:4200](http://localhost:4200)

:five: Ouvrez un deuxième terminal et positionnez-vous dans votre dossier backend,
```
cd backend
````
puis tapez les instructions suivantes :
```
npm install
nodemon server
````
The backend s'exécutera sur [http://localhost:3000](http://localhost:3000)

:six: Créez un fichier .env à la racine du fichier (pour des raisons de sécurité, le fichier que j'ai utilisé ne figure pas sur ce repo, vous devrez le créer)
```
touch .env
````
:seven: Paramétrez votre base de données MongoDB : créez un cluster, puis un utilisateur (pensez à conserver le mot de passe). Ensuite, allez sur Network Access et sélectionnez "Add IP Adress", puis : "Add access from Anywhere"

:eight: Copiez le texte présent dans le fichier env.example and collez le dans votre propre fichier .env. Ensuite, changer la valeur de MONGODB_URI par votre propre lien de connexion(accessible depuis "COnnect" puis "Connect your application"). Pensez également à remplacer les termes username et password par vos propres données.

:nine: Changez le JWT_SECRET_TOKEN par un token de votre choix.

Tout est bon !


