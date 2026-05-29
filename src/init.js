

const init = async () => {
  const db = require('./db/models').sequelize;
  const {Usuario, Publicaciones, Imagenes} = require('./db/models')
  await db.sync({force: true});
  
  console.log("UnaHur - Anti-Social net");

  // const u1 = await Usuario.create({
  //   nickname: "Nick"
  // });
  // const u2 = await Usuario.create({
  //   nickname: "Nicks"
  // });

  // const p1 = await Publicaciones.create({
  //   descripcion: "Holaaaa",
  //   usuarioId: u1.id
  // })

  // const i1 = await Imagenes.create({
  //   url: "https://j93nzcv053mSJFlsp68.jpg",
  //   publicacionId: p1.id
  // })
};

module.exports = init