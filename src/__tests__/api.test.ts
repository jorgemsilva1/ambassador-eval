import { fetchProducts } from "@/utils/api";
import fetchMock from "jest-fetch-mock";

describe("fetchProducts", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("should fetch products successfully", async () => {
    const mockData = [
      {
        id: 1,
        title: "Product 1",
        price: 10,
        description: "description produit 1",
        category: "category1",
      },
      {
        id: 2,
        title: "Product 2",
        price: 20,
        description: "description produit 2",
        category: "category2",
      },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockData));

    const result = await fetchProducts();

    expect(result).toEqual(mockData);
  });

  it("should handle error if the API request fails", async () => {
    fetchMock.mockResponseOnce("", { status: 500 });
    await expect(fetchProducts()).rejects.toThrow("HTTP error! Status: 500");
  });
});
