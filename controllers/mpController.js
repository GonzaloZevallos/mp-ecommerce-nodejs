const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token:
    "APP_USR-6317427424180639-042414-47e969706991d3a442922b0702a0da44-469485398",
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
          title: "Samsung Galaxy S9",
          currency_id: "ARS",
          picture_url:
            "http://gzevallos-mp-ecommerce-nodejs.herokuapp.com/assets/003.jpg",
          description: "Dispositivo móvil de Tienda e-commerce",
          quantity: 1,
          unit_price: 15000.0,
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
      success: true
    });
  },
  failure(req, res) {
    return res.render("home", { status: "Failure" });
  },
  pending(req, res) {
    return res.render("home", { status: "Pending" });
  },
};
