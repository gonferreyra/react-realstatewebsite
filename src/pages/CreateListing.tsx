import { useState } from "react";

interface ICreateListing {
  type: string;
  name: string;
  bedrooms: number;
  bathrooms: number;
  parking: boolean;
  furnished: boolean;
  address: string;
  description: string;
  offer: boolean;
  price: number;
  discountedPrice: number;
  latitude: number;
  longitud: number;
}

function CreateListing() {
  const [geolocationEnabled, setGeolocationEnabled] = useState<boolean>(false);
  const [formData, setFormData] = useState<ICreateListing>({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnished: false,
    address: "",
    description: "",
    offer: false,
    price: 0,
    discountedPrice: 0,
    latitude: 0,
    longitud: 0,
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnished,
    address,
    description,
    offer,
    price,
    discountedPrice,
    latitude,
    longitud,
  } = formData;

  const onChange = (event: any) => {
    let boolean: boolean;
    if (event.target.value === "true") {
      boolean = true;
    }
    if (event.target.value === "false") {
      boolean = false;
    }
    // Files
    if (event.target.files) {
      setFormData((prevState) => {
        return {
          ...prevState,
          images: event.target.files,
        };
      });
    }
    // Text or boolean
    if (!event.target.files) {
      setFormData((prevState) => {
        return {
          ...prevState,
          [event.target.name]: boolean ?? event.target.value,
        };
      });
    }
  };

  return (
    <main className="main">
      <h1>Create a List</h1>
      <form className="main__form">
        <p>Sell / Rent</p>
        <div className="main__options__container">
          <button
            className={
              "options__buttons " + (type === "rent" ? "bg-white" : "bg-slate")
            }
            type="button"
            id="type"
            name="type"
            value="sale"
            onClick={onChange}
          >
            Sell
          </button>
          <button
            className={
              "options__buttons " + (type === "sale" ? "bg-white" : "bg-slate")
            }
            type="button"
            id="type"
            name="type"
            value="rent"
            onClick={onChange}
          >
            Rent
          </button>
        </div>
        <p className="name">Name</p>
        <input
          className="main__input__name"
          type="text"
          id="name"
          name="name"
          value={name}
          placeholder="Name"
          maxLength={32}
          minLength={10}
          required
          onChange={onChange}
        />
        <div className="main__bedsandbaths">
          <div className="bedsandbaths__container">
            <p>Beds</p>
            <input
              type="number"
              id="bedrooms"
              name="bedrooms"
              value={bedrooms}
              onChange={onChange}
              min="1"
              max="10"
              required
            />
          </div>
          <div className="bedsandbaths__container">
            <p>Bathrooms</p>
            <input
              type="number"
              id="bathrooms"
              name="bathrooms"
              value={bathrooms}
              onChange={onChange}
              min="1"
              max="10"
              required
            />
          </div>
        </div>
        <p>Parking Spot</p>
        <div className="main__options__container">
          <button
            className={
              "options__buttons " + (!parking ? "bg-white" : "bg-slate")
            }
            type="button"
            id="parking"
            name="parking"
            value="true" // Ver, no funcionan
            onClick={onChange}
          >
            Yes
          </button>
          <button
            className={
              "options__buttons " + (parking ? "bg-white" : "bg-slate")
            }
            type="button"
            id="parking"
            name="parking"
            value="false" // Ver, no funcionan
            onClick={onChange}
          >
            No
          </button>
        </div>
        <p>Furnished</p>
        <div className="main__options__container">
          <button
            className={
              "options__buttons " + (!furnished ? "bg-white" : "bg-slate")
            }
            type="button"
            id="furnished"
            name="furnished"
            value="true" // Ver, no funcionan
            onClick={onChange}
          >
            Yes
          </button>
          <button
            className={
              "options__buttons " + (furnished ? "bg-white" : "bg-slate")
            }
            type="button"
            id="furnished"
            name="furnished"
            value="false"
            onClick={onChange}
          >
            No
          </button>
        </div>
        <p className="name">Address</p>
        <textarea
          className="main__input__name"
          id="address"
          name="address"
          value={address}
          placeholder="Address"
          required
          onChange={onChange}
        />
        {!geolocationEnabled && (
          <div>
            <div className="">
              <p>Latitude</p>
              <input
                type="number"
                name="latitude"
                value={latitude}
                required
                onChange={onChange}
              />
            </div>
          </div>
        )}
        <p
          className="name"
          style={{
            marginTop: "0",
          }}
        >
          Description
        </p>
        <textarea
          className="main__input__name"
          id="description"
          name="description"
          value={description}
          placeholder="Description"
          required
          onChange={onChange}
        />
        <p
          style={{
            marginTop: "0",
          }}
        >
          Offer
        </p>
        <div
          className="main__options__container"
          style={{ marginBottom: "24px" }}
        >
          <button
            className={"options__buttons " + (!offer ? "bg-white" : "bg-slate")}
            type="button"
            id="offer"
            name="offer"
            value="true"
            onClick={onChange}
          >
            Yes
          </button>
          <button
            className={"options__buttons " + (offer ? "bg-white" : "bg-slate")}
            type="button"
            id="offer"
            name="offer"
            value="false"
            onClick={onChange}
          >
            No
          </button>
        </div>
        <div className="price">
          <div className="price__container">
            <p>Price</p>
            <div className="price__flex__container">
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                min={50}
                max={5000000}
                required
                onChange={onChange}
              />
              {type === "rent" && (
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      width: "100%",
                      whiteSpace: "nowrap",
                    }}
                  >
                    $ / Month
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        {offer && (
          <div className="price">
            <div className="price__container">
              <p>Discounted price</p>
              <div className="price__flex__container">
                <input
                  type="number"
                  id="discountedPrice"
                  name="discountedPrice"
                  value={discountedPrice}
                  min={50}
                  max={5000000}
                  required={offer} // if offer is true
                  onChange={onChange}
                />
                {type === "rent" && (
                  <div>
                    <p
                      style={{
                        fontSize: "14px",
                        width: "100%",
                        whiteSpace: "nowrap",
                      }}
                    >
                      $ / Month
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="images">
          <p className="images__p1">Images</p>
          <p className="images__p2">
            The first image will be the cover (max 6)
          </p>
          <input
            type="file"
            name="images"
            id="images"
            onChange={onChange}
            accept=".jpg, .png, .jpeg"
            multiple // acept multiple img
            required
          />
        </div>
        <button type="submit" className="form__submit__btn">
          Create listing
        </button>
      </form>
    </main>
  );
}

export default CreateListing;
