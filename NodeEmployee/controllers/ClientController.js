var mongoose = require("mongoose");
var Client = require("../models/Client");

var clientController = {};

	// Show list of clients
clientController.list= function(req, res){
	client.find({}).exec (function(err, clients){
	
		if(err){
			console.log("Error:", err);
		}
		else{
			res.render("../views/clients/index", { clients: clients });
		}
	});
};

	//Show client by id
clientController.show = function(req,res){
  Client.find({}).exec(function (err, clients) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/clients/index", { client: client });
        }
    });
};
	//Create new client
clientController.create = function(req,res){
	res.render("../views/clients/create");
};

	//Save new client
clientController.save = function (req, res) {
    var client = new Client(req.body);

    client.save(function (err) {
        if (err) {
            console.log(err);
            res.render("../views/client/create");
        } else {
            console.log("Successfully created a client.");
            client.find({}).exec(function (err, clients) {
                if (err) {
                    console.log("Error:", err);
                }
                else {
                    res.render("../views/client/index", { clients: clients });
                }
            });
        }
    });
};
	// Edit a client
clientController.edit = function (req, res) {
    Client.findOne({ _id: req.params.id }).exec(function (err, client) {
        if (err) {
            console.log("Error:", err);
        }
        else {
            res.render("../views/clients/edit", { client: client });
        }
    });
};

// Update a client
clientController.update = function (req, res) {
    Client.findByIdAndUpdate(req.params.id, {
        $set: {
            name: req.body.jobtype, 
			address: req.body.jobcategory,
            contactnumber: req.body.jobdescription
			email: req.body.jobdescription
        }
    }, { new: true }, function (err, client) {
        if (err) {
            console.log(err);
            res.render("../views/clients/edit", { client: req.body });
        }

        console.log(req.params.id);
        console.log(req.body);

        Client.find({}).exec(function (err, clients) {
            if (err) {
                console.log("Error:", err);
            }
            else {
                res.render("../views/clients/index", { clients: clients });
            }
        });
    });
};

// Delete a client
clientController.delete = function (req, res) {
    Client.remove({ _id: req.params.id }, function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Client deleted!");
            Client.find({}).exec(function (err, clients) {
                if (err) {
                    console.log("Error:", err);
                }
                else {
                    res.render("../views/clients/index", { clients: clients });
                }
            });
        }
    });
}; 

module.exports = clientController;
	
