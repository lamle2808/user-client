import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { SapXep } from "../../assets/action/Data";

function Find() {
  const { id } = useParams();
  const itemDetails = id.split(/[,]/);
  const itemBrand = id.split(/[:]/);
  console.log(itemBrand[1]);
  const [sortData, setSort] = useState("");
  const [dataPhone, setDataPhone] = useState([]);

  const style = [
    { top: "-6em" },
    {
      bottom: "270px",
    },
  ];

  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios.get("/api/v1/products/getAll");
        let data = res && res.data ? res.data : [];
        
        // Xử lý tìm kiếm theo ID hoặc tên danh mục
        // Lấy ID danh mục hoặc mã danh mục (ao-thun, ao-khoac...)
        const categoryId = itemDetails[0]; 
        // Lấy tên danh mục (sau dấu ":")
        const categoryName = itemBrand[1]; 
        
        console.log("Tìm theo ID/mã:", categoryId, "Tên:", categoryName);
        
        // Lọc sản phẩm theo nhiều điều kiện
        let filteredData = data.filter((item) => {
          // Nếu danh mục là số, so sánh với ID
          if (!isNaN(parseInt(categoryId))) {
            return (
              item.category.id === parseInt(itemDetails[0]) ||
              item.category.id === parseInt(itemDetails[1]) ||
              item.category.id === parseInt(itemDetails[2])
            );
          } 
          // Nếu là chuỗi ao-thun, ao-khoac... tìm theo từ khóa
          else {
            // Tìm theo tên danh mục
            const productName = item.productName?.toLowerCase() || '';
            const productCategory = item.category?.categoryName?.toLowerCase() || '';
            const searchName = categoryName?.toLowerCase() || '';
            
            // Kiểm tra tên sản phẩm hoặc danh mục có chứa từ khóa tìm kiếm
            return (
              productName.includes(searchName) || 
              productCategory.includes(searchName) ||
              // Kiểm tra theo loại danh mục
              (categoryId === 'ao-thun' && (productName.includes('áo thun') || productCategory.includes('áo thun'))) ||
              (categoryId === 'ao-khoac' && (productName.includes('áo khoác') || productCategory.includes('áo khoác'))) ||
              (categoryId === 'ao-so-mi' && (productName.includes('áo sơ mi') || productCategory.includes('áo sơ mi'))) ||
              (categoryId === 'quan-short' && (productName.includes('quần short') || productCategory.includes('quần short'))) ||
              (categoryId === 'quan-dai' && (productName.includes('quần') && !productName.includes('short')))
            );
          }
        });
        
        // Áp dụng sắp xếp
        if (sortData === "Giá cao - thấp") {
          setDataPhone(filteredData.sort((a, b) => b.price - a.price));
        } else if (sortData === "Giá thấp - cao") {
          setDataPhone(filteredData.sort((a, b) => a.price - b.price));
        } else if (sortData === "Khuyến mãi hot") {
          axios
            .get("http://localhost:8521/api/v1/products/getSPNB")
            .then(function (response) {
              const promoData = response.data;
              const promoFilteredData = promoData.filter(item => {
                if (!isNaN(parseInt(categoryId))) {
                  return (
                    item.category.id === parseInt(itemDetails[0]) ||
                    item.category.id === parseInt(itemDetails[1]) ||
                    item.category.id === parseInt(itemDetails[2])
                  );
                } else {
                  const productName = item.productName?.toLowerCase() || '';
                  const productCategory = item.category?.categoryName?.toLowerCase() || '';
                  const searchName = categoryName?.toLowerCase() || '';
                  
                  return (
                    productName.includes(searchName) || 
                    productCategory.includes(searchName) ||
                    (categoryId === 'ao-thun' && (productName.includes('áo thun') || productCategory.includes('áo thun'))) ||
                    (categoryId === 'ao-khoac' && (productName.includes('áo khoác') || productCategory.includes('áo khoác'))) ||
                    (categoryId === 'ao-so-mi' && (productName.includes('áo sơ mi') || productCategory.includes('áo sơ mi'))) ||
                    (categoryId === 'quan-short' && (productName.includes('quần short') || productCategory.includes('quần short'))) ||
                    (categoryId === 'quan-dai' && (productName.includes('quần') && !productName.includes('short')))
                  );
                }
              });
              setDataPhone(promoFilteredData);
            })
            .catch(function (error) {
              console.log(error);
              setDataPhone(filteredData);
            });
        } else {
          setDataPhone(filteredData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id, sortData, itemDetails, itemBrand]);

  const Itemas = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    ":hover": {
      backgroundColor: "#aa91ff",
      fontWeight: "bold",
    },
  }));
  const handleChange = (e) => {
    setSort(e);
  };

  return (
    <section>
      <div className="container-xl py-2" style={{ width: "92%" }}>
        <div className="row">
          {/* <Typography variant="h5">Chọn theo tiêu chí</Typography>
          <Grid container>
            {Array.from(criteria).map((item, index) => (
              <Grid
                item
                xs={2}
                sm={1}
                md={2}
                key={index}
                sx={{ margin: 1, cursor: "pointer" }}
              >
                <Itemas>{item.name}</Itemas>
              </Grid>
            ))}
          </Grid> */}
        </div>
        <div className="row">
          <Typography variant="h5">Sắp xếp theo</Typography>
          <Grid container>
            {Array.from(SapXep).map((item, index) => (
              <Grid
                item
                xs={2}
                sm={1}
                md={2}
                key={index}
                sx={{ margin: 1, cursor: "pointer" }}
              >
                <Itemas onClick={() => handleChange(item.name)}>
                  {item.name}
                </Itemas>
              </Grid>
            ))}
          </Grid>
        </div>
        <div className="row" style={{ marginTop: 20 }}>
          {dataPhone.map((item, index) => (
            <div className="col-md-4 mb-5" key={index}>
              <Item children={item} style={style} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Find;
