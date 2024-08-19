#[macro_use] extern crate rocket;
use rocket_dyn_templates::{Template, context};

#[get("/")]
fn index() -> Template {
    Template::render("index", context! { field: "value" })
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/static", rocket::fs::FileServer::from("static")).mount("/", routes![index]).attach(Template::fairing())
}
