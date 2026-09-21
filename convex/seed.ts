import { mutation } from "./_generated/server";

const SEED: Array<{
  title: string;
  priceNgn: number;
  sizes: string[];
  fabric: string;
  occasion: string;
  photoUrl: string;
  sourceUrl: string;
}> = [
  { title: "Amina Blue 3pc Skirt Set", priceNgn: 96000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "/dera/dera-02.jpg", sourceUrl: "https://www.styleinlagos.ng/product/amina-blue-3pc-skirt-set/" },
  { title: "Penelope White Dress", priceNgn: 78000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_3607.jpg", sourceUrl: "https://www.styleinlagos.ng/product/penelope-white-dress/" },
  { title: "Hailey Yellow Shorts Set", priceNgn: 65000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/07/IMG_2445.png", sourceUrl: "https://www.styleinlagos.ng/product/hailey-yellow-shorts-set/" },
  { title: "Ada Dress", priceNgn: 153000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_5310.jpg", sourceUrl: "https://www.styleinlagos.ng/product/ada-dress/" },
  { title: "Eni Blue Striped Dress Set", priceNgn: 85000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "/dera/dera-06.jpg", sourceUrl: "https://www.styleinlagos.ng/product/eni-blue-striped-dress-set/" },
  { title: "Amayah Burgundy Dress", priceNgn: 76000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_5230.jpg", sourceUrl: "https://www.styleinlagos.ng/product/amayah-burgundy-dress/" },
  { title: "Hailey White Skirt Set", priceNgn: 43000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_5131.jpg", sourceUrl: "https://www.styleinlagos.ng/product/hailey-white-skirt-set/" },
  { title: "Ella Polkadot Dress", priceNgn: 56500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_5127.jpg", sourceUrl: "https://www.styleinlagos.ng/product/ella-polkadot-dress/" },
  { title: "Amanda Green Dress", priceNgn: 75000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_5130.png", sourceUrl: "https://www.styleinlagos.ng/product/amanda-green-dress/" },
  { title: "Isabella Wine Frill Dress", priceNgn: 76000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_5006.png", sourceUrl: "https://www.styleinlagos.ng/product/isabella-wine-frill-dress/" },
  { title: "Tyla Burnt Orange Dress", priceNgn: 69500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_4924.png", sourceUrl: "https://www.styleinlagos.ng/product/tyla-burnt-orange-dress/" },
  { title: "Maya Brown Dress", priceNgn: 65000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_4922.png", sourceUrl: "https://www.styleinlagos.ng/product/maya-brown-dress/" },
  { title: "Mabel Black Dress", priceNgn: 75000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/09/IMG_4867.jpg", sourceUrl: "https://www.styleinlagos.ng/product/mabel-black-dress/" },
  { title: "Zoey Short Set", priceNgn: 49500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4645.jpg", sourceUrl: "https://www.styleinlagos.ng/product/zoey-short-set/" },
  { title: "Sasha Gold Sequin Dress", priceNgn: 62000, sizes: ["S", "M", "L", "XL"], fabric: "sequin", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4643.png", sourceUrl: "https://www.styleinlagos.ng/product/sasha-gold-sequin-dress/" },
  { title: "Ife Red Top", priceNgn: 36500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4641.jpg", sourceUrl: "https://www.styleinlagos.ng/product/ife-red-top/" },
  { title: "Florence White Dress", priceNgn: 69800, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4467.jpg", sourceUrl: "https://www.styleinlagos.ng/product/florence-white-dress/" },
  { title: "Jasmine Detailed Dress", priceNgn: 87000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4462.jpg", sourceUrl: "https://www.styleinlagos.ng/product/jasmine-detailed-dress/" },
  { title: "Loreen Jumpsuit", priceNgn: 40000, sizes: ["S", "M", "L", "XL"], fabric: "crepe", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4463.jpg", sourceUrl: "https://www.styleinlagos.ng/product/loreen-jumpsuit-2/" },
  { title: "Louisa Floral Dress", priceNgn: 59500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4465-1.jpg", sourceUrl: "https://www.styleinlagos.ng/product/louisa-floral-dress/" },
  { title: "Eloise Gold Dress", priceNgn: 40500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4420.jpg", sourceUrl: "https://www.styleinlagos.ng/product/eloise-gold-dress/" },
  { title: "Phoebe Pink Top", priceNgn: 39800, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4356.jpg", sourceUrl: "https://www.styleinlagos.ng/product/phoebe-pink-top/" },
  { title: "Kendra Black Plisse Kimono", priceNgn: 39500, sizes: ["S", "M", "L", "XL"], fabric: "chiffon", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4268.png", sourceUrl: "https://www.styleinlagos.ng/product/kendra-black-plisse-kimono/" },
  { title: "Kendra Brown Plisse Kimono", priceNgn: 39500, sizes: ["S", "M", "L", "XL"], fabric: "chiffon", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_4272.jpg", sourceUrl: "https://www.styleinlagos.ng/product/kendra-brown-plisse-kimono/" },
  { title: "Roxanne Yellow Frill Dress", priceNgn: 68000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_3732-4.png", sourceUrl: "https://www.styleinlagos.ng/product/roxanne-yellow-frill-dress/" },
  { title: "Amy Grey T-shirt", priceNgn: 29500, sizes: ["S", "M", "L", "XL"], fabric: "cotton", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_3675.jpg", sourceUrl: "https://www.styleinlagos.ng/product/amy-grey-t-shirt/" },
  { title: "Amy White T-Shirt", priceNgn: 29500, sizes: ["S", "M", "L", "XL"], fabric: "cotton", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_3676.png", sourceUrl: "https://www.styleinlagos.ng/product/amy-white-t-shirt/" },
  { title: "Ivy Checkered Dress", priceNgn: 65000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_3864.jpg", sourceUrl: "https://www.styleinlagos.ng/product/ivy-checkered-dress/" },
  { title: "Hazel Brown Dress", priceNgn: 46500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_3542.jpg", sourceUrl: "https://www.styleinlagos.ng/product/hazel-brown-dress/" },
  { title: "Megan Striped Blouse", priceNgn: 36500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/08/IMG_3543.jpg", sourceUrl: "https://www.styleinlagos.ng/product/megan-striped-blouse/" },
  { title: "Mariella Black Dress", priceNgn: 64000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/07/IMG_3040.jpg", sourceUrl: "https://www.styleinlagos.ng/product/mariella-black-dress/" },
  { title: "Arabella Wine Lace Dress", priceNgn: 60000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/07/IMG_2539.jpg", sourceUrl: "https://www.styleinlagos.ng/product/arabella-wine-lace-dress/" },
  { title: "Zainab White/Yellow T Shirt", priceNgn: 30600, sizes: ["S", "M", "L", "XL"], fabric: "cotton", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/07/IMG_2450.jpg", sourceUrl: "https://www.styleinlagos.ng/product/zainab-white-yellow-t-shirt/" },
  { title: "Aremide Black Dress", priceNgn: 55000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/07/IMG_2451.jpg", sourceUrl: "https://www.styleinlagos.ng/product/aremide-black-dress/" },
  { title: "Eli Black Longsleeve Top", priceNgn: 36500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/07/IMG_2084.png", sourceUrl: "https://www.styleinlagos.ng/product/eli-black-longsleeve-top/" },
  { title: "Dara Brown Dress", priceNgn: 43000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/07/IMG_2074.png", sourceUrl: "https://www.styleinlagos.ng/product/dara-brown-dress/" },
  { title: "Boma Grey Draped Dress", priceNgn: 55000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/07/IMG_2006.jpg", sourceUrl: "https://www.styleinlagos.ng/product/boma-grey-draped-dress-2/" },
  { title: "Temisan Trouser Set", priceNgn: 55000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/07/IMG_1931.jpg", sourceUrl: "https://www.styleinlagos.ng/product/temisan-trouser-set/" },
  { title: "Imade Black Maxi Dress", priceNgn: 75000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/06/IMG_1518.jpg", sourceUrl: "https://www.styleinlagos.ng/product/imade-black-maxi-dress/" },
  { title: "Martha Polkadot Dress", priceNgn: 61000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/06/IMG_1483.png", sourceUrl: "https://www.styleinlagos.ng/product/martha-polkadot-dress/" },
  { title: "Demi Wine Mesh Detailed Dress", priceNgn: 70000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/06/IMG_1363.jpg", sourceUrl: "https://www.styleinlagos.ng/product/demi-wine-mesh-detailed-dress/" },
  { title: "Ivy Pink Trouser Set", priceNgn: 55000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/06/IMG_1185.jpg", sourceUrl: "https://www.styleinlagos.ng/product/ivy-pink-trouser-set/" },
  { title: "Ivy White Trouser Set", priceNgn: 55000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/06/IMG_1184.jpg", sourceUrl: "https://www.styleinlagos.ng/product/ivy-white-trouser-set/" },
  { title: "Harriet Pink Dress", priceNgn: 69000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/06/IMG_0752.jpg", sourceUrl: "https://www.styleinlagos.ng/product/harriet-pink-dress/" },
  { title: "Mariam Blue Bubu", priceNgn: 40000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/06/IMG_0516.jpg", sourceUrl: "https://www.styleinlagos.ng/product/mariam-blue-bubu/" },
  { title: "Sonia White Bandage Dress", priceNgn: 89000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/05/IMG_0110.jpg", sourceUrl: "https://www.styleinlagos.ng/product/sonia-white-bandage-dress/" },
  { title: "Adanma Cream Top", priceNgn: 41000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/03/IMG_6666.jpeg", sourceUrl: "https://www.styleinlagos.ng/product/adanma-cream-top/" },
  { title: "Celine Green Dress", priceNgn: 51500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/04/IMG_3101.png", sourceUrl: "https://www.styleinlagos.ng/product/celine-green-dress-2/" },
  { title: "Arin Pink Skirt Set", priceNgn: 43500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/05/IMG_9378.jpg", sourceUrl: "https://www.styleinlagos.ng/product/arin-pink-skirt-set/" },
  { title: "Farida Blue Detailed Dress", priceNgn: 63000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/05/IMG_9277.jpg", sourceUrl: "https://www.styleinlagos.ng/product/farida-blue-detailed-dress/" },
  { title: "Tracy Black Longsleeve Dress", priceNgn: 58700, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/05/IMG_9276.jpg", sourceUrl: "https://www.styleinlagos.ng/product/tracy-black-longsleeve-dress/" },
  { title: "Joan Blue Dress", priceNgn: 39500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/03/IMG_6656.jpeg", sourceUrl: "https://www.styleinlagos.ng/product/joan-blue-dress/" },
  { title: "The Aiko Dress", priceNgn: 43000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/03/IMG_7663.jpg", sourceUrl: "https://www.styleinlagos.ng/product/the-aiko-dress/" },
  { title: "Audrey Pink Dress", priceNgn: 53000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/03/IMG_6579.png", sourceUrl: "https://www.styleinlagos.ng/product/audrey-pink-dress/" },
  { title: "Sameen Cream Dress", priceNgn: 47500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/04/IMG_9022.jpg", sourceUrl: "https://www.styleinlagos.ng/product/sameen-cream-dress/" },
  { title: "Clara Olive Green Top", priceNgn: 39800, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/04/IMG_9025.png", sourceUrl: "https://www.styleinlagos.ng/product/clara-olive-green-top-2/" },
  { title: "Dayo Brown Dress", priceNgn: 38500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/04/IMG_3200.jpg", sourceUrl: "https://www.styleinlagos.ng/product/dayo-brown-dress/" },
  { title: "Isabel Black Longsleeve Dress", priceNgn: 41500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2025/12/IMG_1150.png", sourceUrl: "https://www.styleinlagos.ng/product/isabel-black-longsleeve-dress/" },
  { title: "Sarah Green Sequin Dress", priceNgn: 49000, sizes: ["S", "M", "L", "XL"], fabric: "sequin", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/02/IMG_4918.png", sourceUrl: "https://www.styleinlagos.ng/product/sarah-green-sequin-dress/" },
  { title: "Sarah Pink Sequin Dress", priceNgn: 49000, sizes: ["S", "M", "L", "XL"], fabric: "sequin", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/02/IMG_4919.png", sourceUrl: "https://www.styleinlagos.ng/product/sarah-pink-sequin-dress/" },
  { title: "Atinuke Black Fringe Bandage Dress", priceNgn: 86000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2024/12/IMG_0849.jpeg", sourceUrl: "https://www.styleinlagos.ng/product/atinuke-black-fringe-bandage-dress/" },
  { title: "Elaine Trouser Set", priceNgn: 53500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/04/IMG_3079.jpg", sourceUrl: "https://www.styleinlagos.ng/product/elaine-trouser-set/" },
  { title: "Brandy Peach Shorts Set", priceNgn: 55000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/02/Brandy-Peach-Shorts-Set.png", sourceUrl: "https://www.styleinlagos.ng/product/brandy-peach-shorts-set-2/" },
  { title: "Tami Off Shoulder Mesh Dress", priceNgn: 41000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/02/Tami-Off-Shoulder-Mesh-Dress.png", sourceUrl: "https://www.styleinlagos.ng/product/tami-off-shoulder-mesh-dress/" },
  { title: "Tracy White Bandage Dress", priceNgn: 90000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/04/IMG_8197.png", sourceUrl: "https://www.styleinlagos.ng/product/tracy-white-bandage-dress/" },
  { title: "Mara Metallic Shirt", priceNgn: 34500, sizes: ["S", "M", "L", "XL"], fabric: "cotton", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/04/IMG_8218.png", sourceUrl: "https://www.styleinlagos.ng/product/mara-metallic-shirt/" },
  { title: "Jade White Dress", priceNgn: 48500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/04/IMG_8091.png", sourceUrl: "https://www.styleinlagos.ng/product/jade-white-dress/" },
  { title: "Sandra White Detailed Dress", priceNgn: 53000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/04/IMG_8076.png", sourceUrl: "https://www.styleinlagos.ng/product/sandra-white-detailed-dress/" },
  { title: "Rakia Top", priceNgn: 39800, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/03/IMG_7948.jpg", sourceUrl: "https://www.styleinlagos.ng/product/rakia-top/" },
  { title: "Victoria Black Jumpsuit", priceNgn: 41000, sizes: ["S", "M", "L", "XL"], fabric: "crepe", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/03/IMG_7828.png", sourceUrl: "https://www.styleinlagos.ng/product/victoria-black-jumpsuit/" },
  { title: "Isi Black Dress", priceNgn: 44000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/03/IMG_7636.png", sourceUrl: "https://www.styleinlagos.ng/product/isi-black-dress/" },
  { title: "Ifunanya Cream Top", priceNgn: 39900, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/03/IMG_7576.png", sourceUrl: "https://www.styleinlagos.ng/product/ifunanya-cream-top/" },
  { title: "Tamilore Pink Dress", priceNgn: 43000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/02/IMG_4932.png", sourceUrl: "https://www.styleinlagos.ng/product/tamilore-pink-dress-2/" },
  { title: "Damilola Denim Dress", priceNgn: 43000, sizes: ["S", "M", "L", "XL"], fabric: "denim", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/03/Damilola-Denim-Dress.png", sourceUrl: "https://www.styleinlagos.ng/product/damilola-denim-dress/" },
  { title: "Morayo Yellow Dress", priceNgn: 39500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/02/IMG_4899.png", sourceUrl: "https://www.styleinlagos.ng/product/morayo-yellow-dress/" },
  { title: "Molly Green Bikini", priceNgn: 39000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/03/Molly-Green-Bikini.png", sourceUrl: "https://www.styleinlagos.ng/product/molly-green-bikini-2/" },
  { title: "Tracy Black Swimsuit", priceNgn: 39000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/03/Tracy-Black-Swimsuit.png", sourceUrl: "https://www.styleinlagos.ng/product/tracy-black-swimsuit/" },
  { title: "Maddy Blue Bikini", priceNgn: 39000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/03/Maddy-Blue-Bikini.png", sourceUrl: "https://www.styleinlagos.ng/product/maddy-blue-bikini/" },
  { title: "Amira Blue Dress", priceNgn: 48500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/03/Amira-Blue-Dress.png", sourceUrl: "https://www.styleinlagos.ng/product/amira-blue-dress/" },
  { title: "Mimi Wine Top", priceNgn: 39600, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/03/Mimi-Wine-Top.png", sourceUrl: "https://www.styleinlagos.ng/product/mimi-wine-top/" },
  { title: "Rakia Wine Slit Dress", priceNgn: 50000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/01/IMG_4567.jpeg", sourceUrl: "https://www.styleinlagos.ng/product/rakia-wine-slit-dress/" },
  { title: "Lily Green Dress", priceNgn: 38000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2025/12/IMG_1204.png", sourceUrl: "https://www.styleinlagos.ng/product/lily-green-dress/" },
  { title: "Ego Navy Shirt", priceNgn: 39600, sizes: ["S", "M", "L", "XL"], fabric: "cotton", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/03/IMG_6667.jpeg", sourceUrl: "https://www.styleinlagos.ng/product/ego-navy-shirt/" },
  { title: "Alex Green Sparkle Dress", priceNgn: 51500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/03/IMG_6657.jpeg", sourceUrl: "https://www.styleinlagos.ng/product/alex-green-sparkle-dress/" },
  { title: "Mallory Blue Dress", priceNgn: 45000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/03/IMG_6581.jpeg", sourceUrl: "https://www.styleinlagos.ng/product/mallory-blue-dress-2/" },
  { title: "Faith Striped Shirt", priceNgn: 32000, sizes: ["S", "M", "L", "XL"], fabric: "cotton", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/02/Faith-Striped-Shirt.png", sourceUrl: "https://www.styleinlagos.ng/product/faith-striped-shirt/" },
  { title: "Trisha Black Dress", priceNgn: 42000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/02/Trisha-Black-Dress.png", sourceUrl: "https://www.styleinlagos.ng/product/trisha-black-dress/" },
  { title: "Loretta Cream Dress", priceNgn: 42000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/02/IMG_4895.png", sourceUrl: "https://www.styleinlagos.ng/product/loretta-cream-dress/" },
  { title: "Teju Black Skirt Set", priceNgn: 40000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "street", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/02/Teju-Black-Skirt-Set.jpg", sourceUrl: "https://www.styleinlagos.ng/product/teju-black-skirt-set/" },
  { title: "Simi Blue Detail Maxi", priceNgn: 48000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/02/Simi-Blue-Detail-Maxi.jpg", sourceUrl: "https://www.styleinlagos.ng/product/simi-blue-detail-maxi/" },
  { title: "Eleanor Yellow Dress", priceNgn: 40000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2025/06/IMG_2272.jpeg", sourceUrl: "https://www.styleinlagos.ng/product/eleanor-yellow-dress/" },
  { title: "Hafsa Cream Bikini", priceNgn: 39000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/02/IMG_5761.png", sourceUrl: "https://www.styleinlagos.ng/product/hafsa-cream-bikini/" },
  { title: "Irene Blue Bikini", priceNgn: 39500, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/02/IMG_5760.png", sourceUrl: "https://www.styleinlagos.ng/product/irene-blue-bikini/" },
  { title: "Tany White 4pc Bikini", priceNgn: 40000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/02/IMG_5759.png", sourceUrl: "https://www.styleinlagos.ng/product/tany-white-4pc-bikini/" },
  { title: "Nubia Yellow Bikini", priceNgn: 39000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/02/IMG_5758.png", sourceUrl: "https://www.styleinlagos.ng/product/nubia-yellow-bikini/" },
  { title: "Remi Blue Bikini", priceNgn: 39000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/02/IMG_5757.png", sourceUrl: "https://www.styleinlagos.ng/product/remi-blue-bikini/" },
  { title: "Ila White Bikini", priceNgn: 39000, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "church", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/02/IMG_5756.png", sourceUrl: "https://www.styleinlagos.ng/product/ila-white-bikini/" },
  { title: "Teressa Wine Midi Dress", priceNgn: 39900, sizes: ["S", "M", "L", "XL"], fabric: "boutique", occasion: "owambe", photoUrl: "https://www.styleinlagos.ng/wp-content/uploads/2026/02/IMG_5783.png", sourceUrl: "https://www.styleinlagos.ng/product/teressa-wine-midi-dress/" },
];

export const seedDera = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("vendors").order("desc").take(1);
    let vendorId = existing[0]?._id;
    if (vendorId === undefined) {
      vendorId = await ctx.db.insert("vendors", {
        name: "Dera's Store",
        area: "Lagos",
        instagramUrl: "https://www.instagram.com/styleinlagosss",
      });
    }
    const current = await ctx.db
      .query("listings")
      .withIndex("by_vendor", (q) => q.eq("vendorId", vendorId as NonNullable<typeof vendorId>))
      .take(1);
    if (current.length > 0) return { vendorId, seeded: 0 };
    for (const item of SEED) {
      await ctx.db.insert("listings", { vendorId, ...item, status: "active", stock: 8 });
    }
    return { vendorId, seeded: SEED.length };
  },
});

// One-shot fix: swim and beach pieces were heuristically tagged church.
export const reclassifySwim = mutation({
  args: {},
  handler: async (ctx) => {
    const listings = await ctx.db.query("listings").order("desc").take(500);
    let fixed = 0;
    for (const listing of listings) {
      const title = listing.title.toLowerCase();
      if (listing.occasion !== "street" && (title.includes("swim") || title.includes("beach") || title.includes("bikini"))) {
        await ctx.db.patch("listings", listing._id, { occasion: "street" });
        fixed += 1;
      }
    }
    return { fixed };
  },
});
// Replaces the whole vendor catalog with Firecrawl-fed SEED data.
// Clears listings + orders + inboxEvents so no stale best-guess rows remain.
export const replaceCatalog = mutation({
  args: {},
  handler: async (ctx) => {
    const existing = await ctx.db.query("vendors").order("desc").take(1);
    const vendor = existing[0];
    if (vendor === undefined) throw new Error("No vendor. Run seedDera first");
    const vendorId = vendor._id;
    const orders = await ctx.db
      .query("orders")
      .withIndex("by_vendor", (q) => q.eq("vendorId", vendorId))
      .take(200);
    for (const order of orders) {
      const events = await ctx.db
        .query("inboxEvents")
        .withIndex("by_order", (q) => q.eq("orderId", order._id))
        .take(100);
      for (const event of events) await ctx.db.delete("inboxEvents", event._id);
      await ctx.db.delete("orders", order._id);
    }
    const listings = await ctx.db
      .query("listings")
      .withIndex("by_vendor", (q) => q.eq("vendorId", vendorId))
      .take(200);
    for (const listing of listings) await ctx.db.delete("listings", listing._id);
    for (const item of SEED) {
      await ctx.db.insert("listings", { vendorId, ...item, status: "active", stock: 8 });
    }
    await ctx.db.patch("vendors", vendorId, { whatsapp: "08091003832" });
    return { inserted: SEED.length };
  },
});
