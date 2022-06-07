import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const StockOutputs = () => {
  const [amount, setAmount] = useState("");
  const [product_id, setProduct_id] = useState("0");
  const [listStockOutputs, setStockOutputs] = useState([]);
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    const db_stock_outputs = localStorage.getItem("db_stock_outputs")
      ? JSON.parse(localStorage.getItem("db_stock_outputs"))
      : [];

    setStockOutputs(db_stock_outputs);

    const db_products = localStorage.getItem("db_products")
      ? JSON.parse(localStorage.getItem("db_products"))
      : [];

    setListProducts(db_products);
  }, []);

  const handleNewOutput = () => {
    if (!amount | (product_id === "0")) {
      return alert("Selecione o produto e a quantidade!");
    }

    const id = Math.random().toString(36).substring(2);

    if (listStockOutputs && listStockOutputs.length) {
      localStorage.setItem(
        "db_stock_outputs",
        JSON.stringify([...listStockOutputs, { id, amount, product_id }])
      );

      setStockOutputs([...listStockOutputs, { id, amount, product_id }]);
    } else {
      localStorage.setItem(
        "db_stock_outputs",
        JSON.stringify([{ id, amount, product_id }])
      );

      setStockOutputs([{ id, amount, product_id }]);
    }

    setAmount("");
    setProduct_id("0");
  };

  const removeOutput = (id) => {
    const newArray = listStockOutputs.filter((item) => item.id !== id);

    localStorage.setItem("db_stock_outputs", JSON.stringify(newArray));

    setStockOutputs(newArray);
  };

  const getProductById = (id) => {
    return listProducts.filter((item) => item.id === id)[0]?.name;
  };

  return (
    <Flex h="100vh" flexDirection="column">
      <Header />

      <Flex w="100%" my="6" maxW={1120} mx="auto" px="6" h="100vh">
        <Sidebar />

        <Box w="100%">
          <SimpleGrid minChildWidth={240} h="fit-content" spacing="6">
            <Select
              value={product_id}
              onChange={(e) => setProduct_id(e.target.value)}
            >
              <option value="0">Selecione um item</option>
              {listProducts &&
                listProducts.length > 0 &&
                listProducts.map((item, i) => (
                  <option key={i} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </Select>
            <Input
              placeholder="Quantidade"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button w="40" onClick={handleNewOutput}>
              SALVAR
            </Button>
          </SimpleGrid>

          <Box overflowY="auto" height="80vh">
            <Table mt="6">
              <Thead>
                <Tr>
                  <Th fontWeight="bold" fontSize="14px">
                    Nome
                  </Th>
                  <Th fontWeight="bold" fontSize="14px">
                    Qtd.
                  </Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {listStockOutputs.map((item, i) => (
                  <Tr key={i}>
                    <Td color="gray.500">{getProductById(item.product_id)}</Td>
                    <Td color="gray.500">{item.amount}</Td>
                    <Td textAlign="end">
                      <Button
                        p="2"
                        h="auto"
                        fontSize={11}
                        color="red.500"
                        fontWeight="bold"
                        onClick={() => removeOutput(item.id)}
                      >
                        DELETAR
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
};

export default StockOutputs;
