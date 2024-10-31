const encryptedPassword = 'sua_senha_criptografada_aqui';
const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, 'chave-secreta').toString(CryptoJS.enc.Utf8);
console.log('Senha descriptografada para teste:', decryptedPassword);
