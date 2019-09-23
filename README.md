# Timesheet

This project is hosted at https://prospec-timesheet.herokuapp.com/

Everytime an employee flashes his QR code to our scanner, a record of his employee id and scan timing is sent to our database (AWS MySQL). This web interface allows an employer to view the scan in and scan out timings for each worker on each day, and their corresponding hours worked.

To run locally:

1. Set up a MySQL DB instance.
2. Create a `.env` file with the following variables:
`RDS_HOSTNAME`, `RDS_USERNAME`, `RDS_PASSWORD`, `RDS_PORT`
3. On command line, run ```npm start```