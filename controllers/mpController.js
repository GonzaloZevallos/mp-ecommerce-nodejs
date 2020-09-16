const mercadopago = require("mercadopago");
const fs = require("fs");
const path = require("path");

mercadopago.configure({
  access_token:
    "APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398",
  integrator_id: "dev_24c65fb163bf11ea96500242ac130004",
});

module.exports = {
  home(req, res) {
    return res.render("home", req.query);
  },
  async detail(req, res) {
    let preferenceObj = {
      items: [
        {
          id: 1234,
          title: req.query.title,
          picture_url: `http://gzevallos-mp-ecommerce-php.herokuapp.com${req.query.img.slice(
            1
          )}`,
          description: "Dispositivo móvil de Tienda e-commerce",
          quantity: Number(req.query.unit),
          unit_price: Number(req.query.price),
        },
      ],
      payer: {
        name: "Lalo",
        surname: "Landa",
        email: "test_user_63274575@testuser.com",
        phone: {
          area_code: "11",
          number: 22223333,
        },
        address: {
          street_name: "False",
          street_number: 123,
          zip_code: "1111",
        },
      },
      back_urls: {
        success: "http://gzevallos-mp-ecommerce-nodejs.herokuapp.com/success",
        failure: "http://gzevallos-mp-ecommerce-nodejs.herokuapp.com/failure",
        pending: "http://gzevallos-mp-ecommerce-nodejs.herokuapp.com/pending",
      },
      auto_return: "approved",
      payment_methods: {
        excluded_payment_methods: [
          {
            id: "amex",
          },
        ],
        excluded_payment_types: [
          {
            id: "atm",
          },
        ],
        installments: 6,
      },
      notification_url:
        "http://gzevallos-mp-ecommerce-nodejs.herokuapp.com/notifications?source_news=webhooks",
      external_reference: "gonzalo.zev@gmail.com",
    };

    try {
      let response = await mercadopago.preferences.create(preferenceObj);

      let preference = response.body;

      return res.render("detail", { ...req.query, preference });
    } catch (e) {
      throw new Error(e.name + ": " + e.message);
    }
  },
  success(req, res) {
    return res.render("home", {
      ...req.query,
      status: "Success",
      success: true,
    });
  },
  failure(req, res) {
    return res.render("home", { status: "Failure" });
  },
  pending(req, res) {
    return res.render("home", { status: "Pending" });
  },
  notifications(req, res) {
    if (req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        let bodyParsed = JSON.parse(body);
        console.log(body);
        switch (bodyParsed.type) {
          case "payment":
            return res.status(200).end("Payment created");
            break;
          case "plan":
            return res.status(200).end("Plan created"); 
            break;
          case "subscription":
            return res.status(200).end("Subscription created");
            break;
          case "invoice":
            return res.status(200).end("Invoice created");
            break;
          case "test":
            return res.status(200).end("TEST");
          default:
            return res.status(400).end("TYPE NOT FOUND");
            break;
        }
      });
    } else {
      return res.status(500).end("BAD REQUEST");
    }
  },
  apiProducts(req, res) {
    return res.json(JSON.parse(fs.readFileSync(path.resolve(__dirname + "/../products.json"), "utf-8")));
  }
};
