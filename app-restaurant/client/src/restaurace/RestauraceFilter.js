import Form from "react-bootstrap/Form";
import { useContext, useCallback } from "react";
import { KategorieListContext } from "../kategorie/KategorieListContext";
import Button from "react-bootstrap/Button";
import { RestaurantListContext } from "./RestauraceListProvider";

function RestauraceFilter() {
  const { state, kategorieList } = useContext(KategorieListContext);
  const { setFilter } = useContext(RestaurantListContext);
  //HandleSubmit
  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = {
      mesto: formData.get("mesto"),
      kategorieId: formData.get("kategorieId"),
    };
    //console.log(filters);
    try {
      setFilter(filters);
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <Form className="d-flex center form-filter" onSubmit={handleSubmit}>
      <Form.Group
        className="mb-3 center"
        style={{ gap: "30px" }}
        controlId="form.mesto"
      >
        <Form.Label style={{ height: "60%" }}>Město</Form.Label>
        <Form.Control
          name="mesto"
          style={{ height: "60%" }}
          type="text"
          placeholder="Zadejte město"
        />
      </Form.Group>

      <Form.Select
        name="kategorieId"
        aria-label="Vyber kategorii"
        style={{ width: "20%" }}
      >
        <option value="">Vyber Kategorii</option>
        {state === "ready" &&
          kategorieList &&
          kategorieList.map((kategorie) => (
            <option key={kategorie.id} value={kategorie.id}>
              {kategorie.nazev}
            </option>
          ))}
        {/* {state === "ready" &&
          kategorieList.map((kategorie) => {
            return <option key={kategorie.id}>{kategorie.nazev}</option>;
          })} */}
      </Form.Select>
      <Button variant="primary" type="submit" style={{ width: "5%" }}>
        Submit
      </Button>
    </Form>
  );
}

export default RestauraceFilter;
