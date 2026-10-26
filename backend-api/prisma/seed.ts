import "dotenv/config"
import { prisma } from "../src/config/prisma"

async function main() {
  const sampleProducts = [
    {
      name: "Pempek Kapal Selam",
      description: "Pempek telur dengan cuko khas Palembang.",
      price: 25000,
      star: 5,
      img: "/pempek-kapal-selam.jpg",
      location: "Jl. Pahlawan",
      type_id: 2,
    },
    {
      name: "Model Ikan",
      description: "Model ikan dengan kuah kaldu gurih.",
      price: 18000,
      star: 5,
      img: "/model-ikan.jpg",
      location: "Jl. Pahlawan",
      type_id: 2,
    },
    {
      name: "Tekwan",
      description: "Sup ikan dengan kuah udang.",
      price: 15000,
      star: 4,
      img: "/tekwan.jpg",
      location: "Jl. Demang Lebar Daun",
      type_id: 2,
    },
    {
      name: "Mie Celor",
      description: "Mie dengan kuah santan dan kaldu udang.",
      price: 20000,
      star: 5,
      img: "/mie-celor.jpg",
      location: "Jl. Pahlawan",
      type_id: 2,
    },
    {
      name: "Pindang Patin",
      description: "Pindang patin dengan kuah asam pedas.",
      price: 30000,
      star: 5,
      img: "/pindang-patin.jpg",
      location: "Jl. Basuki Rahmat",
      type_id: 2,
    },
    {
      name: "Laksan",
      description: "Pempek lenjer dengan kuah santan.",
      price: 15000,
      star: 4,
      img: "/laksan.jpg",
      location: "Jl. Pahlawan",
      type_id: 2,
    },
    {
      name: "Es Kacang Merah",
      description: "Es kacang merah dengan susu dan sirup.",
      price: 12000,
      star: 4,
      img: "/es-kacang-merah.jpg",
      location: "Jl. Basuki Rahmat",
      type_id: 2,
    },
  ];

  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: sampleProducts});
  console.log(`Seeding data selesai: ${sampleProducts.length} product contoh dibuat. 📥`)
}

main()
    .catch((error: unknown) => {
        console.log("Seeding gagal:", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await prisma.$disconnect();
    })


