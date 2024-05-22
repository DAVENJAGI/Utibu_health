# Expo Router Example

Use [`expo-router`](https://docs.expo.dev/router/introduction/) to build native navigation using files in the `app/` directory.

## 🚀 How to use

```sh
npx create-expo-app -e with-router
```

## 📝 Notes

- [Expo Router: Docs](https://docs.expo.dev/router/introduction/)

## Console.py
. This is a file containing code that enhances CLI interactivity for interacting with database.

. Its is set up by importing various modules, ie, the cmd module for building the CLI, datetime module for working with the dates, models for importing models, ie, the datamodels.

. It defines dictionary classes that maps into their corresponding classes from the models module.

. It utilizes built in commands, for example, do_EOF and do_quit, that handle the exiting of the program on typing EOF or quit.

. The emptyline prevents the program from exiting when you press enter without typing anything

. It also utilizes custom made commands, that are used to handle data from different modules. These include;

# do_create:

.  Takes an argument representing the class name and optional key value pairs for attributes. It utilizes ```_key_value_parser``` to convert key value pair into dictionaries. It creates a new instance of the specified class wuth the provided attributes. It prints the ID of the created instance and saves it to the storage, ie, database.

# do_show:
. Takes an argument, class and potentially id, User.234594, separated by a dot, prints the string representation of instance retrieved from storage based on class and ID

# do_destroy:
. It takes an argument, class and ID, similar to do_show, and deletes the instance from storage based on the provided class and ID.

# do_all:
. Takes an optional argument specifying a class name. It prints the string representation of all instances in storage or all instances of specified class.

# do_update:
. Takes argument for class name, IDm and new  value. It updated the specified attribute of the instance with the new value in storage considering data like float int

Basically, the CLI aims to allow the user to perform CRUD operations on the data.
