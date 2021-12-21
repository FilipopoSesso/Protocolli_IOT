Protocolli_IOT
==============

Filippo Sesso - Francesco Berlaffa
-----------------------------------


### Database

Abbiamo deciso di utilizzare sqlite in quanto è un database relazionale molto leggero e che secondo noi funziona molto bene per quello che stiamo facendo e in fase di testing. 
In una situazione reale avremmo utilizzato un database come PostgreSQL o MySQL, potenzialmente combinato anche a mongoDB o altro database noSQL per storicizzare la grnade quantità di dati inviata continuamente dai droni.


### Client - Filippo

Abbiamo deciso di utilizzare python per il client per la grande quantità di librerie disponibili e per imparare ad implementare un client web con un linguaggio diverso da quelli utilizzati fino ad ora.


### Server - Francesco

Abbiamo deciso di utilizzare NestJS, un framework di NodeJS, perchè Francesco lo sta studiando per conto suo e voleva provare ad usarlo e anche perchè è scritto in Typescript e questo ci permette di avere un codice compilato al contrario di javascript e quindi capire più velocemente se ci sono errori e dove sono.


### Swagger

Attraverso il file openapi.yaml è possibile vedere le specifiche delle api caricandolo su https://editor.swagger.io/
