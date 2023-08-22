const fs = require('fs');
const path = require('path');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', { products, toThousand })
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const product = products.find(product => +req.params.id === product.id);
		return res.render('detail', { ...product, toThousand })
	},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form')
	},

	// Create -  Method to store
	store: (req, res) => {
		console.log(req.file)
		const { name, price, discount, category, description} = req.body;
		let newProduct = {
			id: products[products.length - 1].id + 1,
			name: name.trim(),
			price: +price,
			discount: +discount,
			category,
			description: description.trim(),
			image: req.file ? req.file.filename : null
		}
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 5), 'utf-8')
		return res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		const product = products.find(product => +req.params.id === product.id);
		return res.render('product-edit-form', {
			...product,
			toThousand
		})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		const { name, price, discount, category, description } = req.body;
		console.log(req.file);


		const productModify = products.map(product => {
			if (+req.params.id === product.id) {
				req.file && fs.existsSync(`./public/images/products/${product.image}`) && fs.unlinkSync(`./public/images/products/${product.image}`);
				product.name = name.trim();
				product.price = +price;
				product.discount = +discount;
				product.category = category;
				product.image = req.file ? req.file.filename : product.image;
				product.description = description.trim();
			}
			return product
		});
		fs.writeFileSync(productsFilePath, JSON.stringify(productModify, null, 5), 'utf-8')
		return res.redirect('/products');
	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {
		// Do the magic
		const product = products.find(product => product.id === +req.params.id);
		fs.existsSync(`./public/images/products/${product.image}`) && fs.unlinkSync(`./public/images/products/${product.image}`);
		products = products.filter(product => product.id !== +req.params.id);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 5), 'utf-8')
		return res.redirect('/products');
	}
};

module.exports = controller;