// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, Card, Collapse } from 'react-bootstrap';
//
// const CategoryTreeNode = ({ categoryId, name }) => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [subcategories, setSubcategories] = useState([]);
//
//     const toggle = () => {
//         if (!isOpen) {
//             axios.get(`http://localhost:8080/auction-service/categories/${categoryId}/subcategories`)
//                 .then(response => {
//                     setSubcategories(response.data);
//                 });
//         }
//         setIsOpen(!isOpen);
//     };
//
//     return (
//         <Card className="mt-3">
//             <Card.Header>
//                 <Button variant="link" onClick={toggle}>
//                     {name}
//                 </Button>
//             </Card.Header>
//             <Collapse in={isOpen}>
//                 <div>
//                     {subcategories.map(sub => (
//                         <CategoryTreeNode key={sub.id} categoryId={sub.id} name={sub.name} />
//                     ))}
//                 </div>
//             </Collapse>
//         </Card>
//     );
// };
//
// const CategoryTree = () => {
//     const [rootCategories, setRootCategories] = useState([]);
//
//     useEffect(() => {
//         axios.get('http://localhost:8080/auction-service/categories/entrypoints')
//             .then(response => {
//                 setRootCategories(response.data);
//             });
//     }, []);
//
//     return (
//         <div>
//             {rootCategories.map(category => (
//                 <CategoryTreeNode key={category.id} categoryId={category.id} name={category.name} />
//             ))}
//         </div>
//     );
// };
//
// export default CategoryTree;
