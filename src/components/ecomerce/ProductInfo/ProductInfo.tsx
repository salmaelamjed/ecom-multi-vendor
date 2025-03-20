import styles from "./styles.module.css";



type ProductInfoProps={
    name:string;
    image:string;
    price:number;
    direction?: "row" | "column";
    children?:React.ReactNode;
    style?:React.CSSProperties;
    quantity:number;
}
const ProductInfo = ({
    name,image,price,direction="row",children,style,quantity=1
 }:ProductInfoProps) => {
  return (
    <div className={`${styles[`product-${direction}`]}`} style={style}>
    <div className={`${styles[`productImg-${direction}`]}`}>
      <img src={image} alt={name} />
    </div>
    <div className={`${styles[`productInfo-${direction}`]}`}>
      <h2 title={name}>{name}</h2>
      <h2>Total quantity  :{quantity}</h2>
      <h3>{price.toFixed(2)} MAD</h3>
        {children}
    </div>
  </div>
  )
}

export default ProductInfo
