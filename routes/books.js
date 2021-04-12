var express = require("express");

var router = express.Router();
var moment = require("moment")
var Book = require("../models/BookSchema");

// Get All Books
router.get("/", function (req, res, next) {
    let ListBooks = [];
    Book.find(function (err, books) {
        if (books) {
            for (let data of books) {
                ListBooks.push({
                    id: data._id,
                    name: data.name,
                    price: data.price,
                    authors: data.authors,
                    release_date: data.release_date,
                    stock: data.stock
                })
            }
            res.render("book/allBooks", {
                ListBooks
            })
        } else {
            ListBooks.push({
                id: "",
                name: "",
                price:"",
                authors:"",
                release_date: "",
                stock: ""
            });
            res.render("book/allBooks", {
                ListBooks
            })
        }
    })

});

router.get("/create", function (req, res, next) {
    res.render("book/createBooks", {
        title: "Add Book Page"
    });
});

router.post("/create", function (req, res) {
    const {
        name,
        price,
        authors,
        date,
        stock
    } = req.body;

    let errors = [];

    if (!name || !price || !authors || !date || !stock) {
        errors.push({
            msg: "Please complete the required data!"
        })
    }

    if (errors.length > 0) {
        res.render("book/createBooks", {
            errors
        });
    } else {
        const newBook = Book({
            name,
            price,
            authors,
            release_date: date,
            stock
        });
        newBook.save().then(
            book => {
                errors.push({
                    msg: "Successfully added new book!"
                });
                res.render("book/createBooks", {
                    errors
                })
            }
        ).catch(err => console.log(err))
    }
});

router.get("/update/:bookId", function (req, res) {
    Book.findById(req.params.bookId, function (err, bookInfo) {
        var newDate = moment(bookInfo.release_date).format("YYYY-MM-DD");

        if (bookInfo) {
            console.log(bookInfo);
            res.render("book/updateBooks", {
                books: bookInfo,
                newDate
            });
        }
    });
});

router.post("/update", function (req, res) {
    let errors = [];

    Book.findByIdAndUpdate(req.body.id, {
            name: req.body.name,
            price: req.body.price,
            authors: req.body.authors,
            release_date: req.body.date,
            stock: req.body.stock
        },
        function (err) {
            if (err) {
                console.log(err);
            } else {
                errors.push({
                    msg: "Data Updated Succesfully!"
                });
                var newBook = {
                    id: req.body.id,
                    name: req.body.name
                };
                var newPrice = {price: req.body.price};
                var newAuthors = {authors: req.body.authors};
                var newDate = moment(req.body.date).format("YYYY-MM-DD");
                var newStock = {stock: req.body.stock};

                res.render("book/updateBooks", {
                    books: newBook,
                    price: newPrice,
                    authors: newAuthors,
                    newDate,
                    stock: newStock,
                    errors
                });
            }
        }
    );
});

router.get("/delete/:bookId", function (req, res) {
    Book.findByIdAndDelete(req.params.bookId, function () {
        res.redirect("/books");
    });
});

module.exports = router;