# Boutik Safe - projet Capacitor

Ce dossier transforme le contenu actuel de Boutik Safe en application Android Capacitor.

## 1. Installation sur un PC

Installer Node.js LTS et Android Studio.

Dans ce dossier :

```bash
npm install
npx cap add android
npm run sync
npm run open:android
```

Android Studio ouvrira le dossier `android` et permettra de générer l'APK.

## 2. Important : même signature / même clé

Pour publier une mise à jour qui remplace l'ancien APK, il faut :

- conserver exactement le même `appId` si l'ancien APK utilise ce package ;
- utiliser exactement le même fichier de signature `.jks` / `.keystore` ;
- utiliser le même alias et les mêmes mots de passe.

L'ancien APK ne contient pas la clé privée de signature. On ne peut donc pas recréer la même clé uniquement à partir de `app-release.apk`.

Si vous possédez le fichier de clé original, copiez-le dans un emplacement sûr, puis configurez la signature dans Android Studio ou dans Gradle.

Le fichier `android/key.properties.example` sert uniquement de modèle. Renommez une copie en `key.properties` et remplacez les valeurs.

## 3. Générer un APK release signé

Après `npm install` et `npx cap add android`, ouvrez Android Studio :

```bash
npm run open:android
```

Puis utilisez **Build > Generate Signed Bundle / APK > APK** et sélectionnez votre clé originale.

## 4. Mettre à jour l'application plus tard

Modifiez les fichiers dans `public/`, puis exécutez :

```bash
npm run sync
npm run open:android
```

Ensuite générez un nouvel APK signé avec la même clé.
