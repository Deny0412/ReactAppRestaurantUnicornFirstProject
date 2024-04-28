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
    try {
      const formData = new FormData(event.target);
      const filters = {
        mesto: formData.get("mesto").toString(),
        kategorieId: formData.get("kategorieId").toString(),
      };
      setFilter(filters);
      console.log(filters);
    } catch (error) {
      console.error("Error submitting form:", error);
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
      </Form.Select>
      <Button variant="primary" type="submit" style={{ width: "5%" }}>
        Submit
      </Button>
    </Form>
  );
}

export default RestauraceFilter;
