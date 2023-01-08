# Automate Parkinglot

## Condition
when you create the parking lots. Assume that the small size is near the entry.

## API List
- createParkingLot
- parkingCar
- leaveParkingCar
- getStatusParkingLot
- getListNumberPlateByCarSize
- getAllocatedSlotByCarSize


## ER Diagram
![alt text](https://github.com/wordev/parkinglot/blob/master/src/pic/er_diagram.png?raw=true)



## How to Unit test
```bash
npm install 
npm run test
```
Or See below
![alt text](https://github.com/wordev/parkinglot/blob/master/src/pic/unit_test.png?raw=true)

## How to run services
```bash
docker-compose up -d
```
If you start services successfully, you can download Postman from the link below, which can help you to play.

Postman
https://drive.google.com/file/d/1_SpzWkYAf4jAijHHe3F57wWcCvtcekHv/view?usp=share_link

For Service will be start at port 8000

For Connect to PostgresDB

```bash
host: localhost
port: 5432
username: admin
password: password
databasename: db
```



## Reference

https://sequelize.org/docs/v6/getting-started/

https://blog.logrocket.com/testing-typescript-apps-using-jest/

https://www.baeldung.com/ops/docker-compose-links-depends-on

https://plainenglish.io/blog/beginners-guide-to-testing-jest-with-node-typescript

https://bobbyhadz.com/blog/typescript-process-env-type

https://sebhastian.com/sequelize-create-table/

https://dev.to/dariansampare/setting-up-docker-typescript-node-hot-reloading-code-changes-in-a-running-container-2b2f