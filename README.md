# Database
In this session, we will delve into the main databases and continue the development of our application, so we need to install these software tools :

## MongoDB : 

First, install MongoDB by visiting: https://www.mongodb.com/try/download/community

Additionally, you may find this YouTube video helpful for the installation process : 
https://www.youtube.com/watch?v=6_NSkDRXPZk

## API Testing :
Due to connection problems, we will replace Postman with Insomnia : https://insomnia.rest/download

# Installing MongoDB using Docker

To install MongoDB using Docker, follow these steps:

1. Run the following command to create and start a MongoDB container:
    ```bash
    docker run -d --name db -v ~/mongo/data:/data/db -p 27017:27017 mongo:latest
    ```
    This command will create a MongoDB container named `db`, with the latest version of MongoDB, and expose port `27017`.

2. Access the MongoDB container using the following command:
    ```bash
    docker exec -it <container-ID> bash
    ```
    Replace `<container-ID>` with the actual ID of your MongoDB container.

3. Once inside the container, start the MongoDB shell by typing:
    ```bash
    mongosh
    ```

4. Switch to the desired database using:
    ```bash
    use test1
    ```

5. To insert data into a collection, use the following command:
    ```bash
    db.collection.insertOne({"content":"test","isCompleted":false});
    ```

6. To retrieve all data from a collection, use:
    ```bash
    db.collection.find();
    ```

7. To retrieve data with a specific ID, use:
    ```bash
    db.collection.find({_id:ObjectId('65c67addee9577be449675ff')});
    ```

8. To delete data from a collection, use:
    ```bash
    db.collection.deleteOne({ _id: ObjectId('65c67addee9577be449675ff') });
    ```

9. To update data in a collection, use:
    ```bash
    db.collection.updateOne(
       { _id: ObjectId('65c67addee9577be449675ff') },
       { $set: { "isCompleted": true } }
    );
    ```
    This command will update the `isCompleted` field to `true` for the document with the specified ID.

Make sure to replace `collection` with the name of your collection in the above commands.




