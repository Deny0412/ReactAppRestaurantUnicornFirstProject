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
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  });
  return (
    <Form className="d-flex center form-filter" onSubmit={handleSubmit}>
      <Form.Group
        className="mb-3 center"
        style={{ gap: "30px", minWidth: "260px" }}
        controlId="form.mesto"
      >
        <Form.Label style={{ height: "60%", fontWeight: "bold" }}>
          Město
        </Form.Label>
        <Form.Control
          name="mesto"
          className="filter-height"
          type="text"
          placeholder="Zadejte město"
        />
      </Form.Group>
      <Form.Group
        controlId="form.kategorieId"
        className="center"
        style={{ gap: "30px", minWidth: "200px" }}
      >
        <Form.Label style={{ fontWeight: "bold" }}>Kategorie</Form.Label>
        <Form.Select
          name="kategorieId"
          aria-label="Vyber kategorii"
          className="filter-height"
          style={{ width: "40%", height: "37px" }}
        >
          <option value="">Všechny</option>
          {state === "ready" &&
            kategorieList &&
            kategorieList.map((kategorie) => (
              <option key={kategorie.id} value={kategorie.id}>
                {kategorie.nazev}
              </option>
            ))}
        </Form.Select>
      </Form.Group>
      <Button
        className="filter-height btn-filter"
        variant="primary"
        type="submit"
      >
        Submit
      </Button>
    </Form>
  );
}

export default RestauraceFilter;
