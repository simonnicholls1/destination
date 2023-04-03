# SSL Setup
SSL certificate is made using certbot

sudo certbot certonly --manual --preferred-challenges=dns -d destinationsurf.com -d www.destinationsurf.com

It will ask you to add a TXT entry into the DNS

Once it has created the certificate and the key you need to replace the secret in Github with the relevant values NOTE: with the 'BEGIN KEY' and ' END KEY ' tags


