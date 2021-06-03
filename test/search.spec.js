const assert = require('assert');
const httpMocks = require("node-mocks-http");
const products_router = require("../routes/products");


describe('Test1', function () {
    /*it('should create the expected query', function () {
        document.getElementById('search-terms').value = 'test';
        document.getElementById("search").click();
    });*/

    it("should return test product info", function () {
        const mockRequest = httpMocks.createRequest({
            method: "GET",
            url: "/search",
            keyword: "test"
        });
        const mockResponse = httpMocks.createResponse();

        products_router(mockRequest, mockResponse);
        const actualResponse = mockResponse._getData();
        const expectedResponse = {
            id: '0fc062ad-6f8a-41d6-9af6-4d8cc8994543',
            name: 'test',
            price: '20.99'
        };

        assert(actualResponse, expectedResponse);
    });
});