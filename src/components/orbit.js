const IPFS = require("ipfs");
const OrbitDB = require("orbit-db");
// const bcrypt = require("bcrypt");

const ipfsOptions = {
  EXPERIMENTAL: {
    pubsub: true,
  },
};

const getUserDb = async () => {
  const ipfss = await IPFS.create(ipfsOptions);
  const orbitdb = await OrbitDB.createInstance(ipfss);
  const db = await orbitdb.open(
    "/orbitdb/zdpuAwB5hnxrEGLPNHHKjE8DASgX8jgeWjA92SmPUAcnLQqQd/users",
  );
  return { db, ipfs };
};

const getCourtUserDb = async () => {
  const ipfs = await IPFS.create(ipfsOptions);
  const orbitdb = await OrbitDB.createInstance(ipfs);
  // const db = await orbitdb.create("courtUsers", "docstore");
  const db = await orbitdb.open(
    "/orbitdb/zdpuAwGZEtPEtM4X7Ci3gg2TvtefPNb2m5TS1W7VFZZ3vY6XH/courtUsers",
  );

  return { db, ipfs };
};

const getJudgeUserDb = async () => {
  const ipfs = await IPFS.create(ipfsOptions);
  const orbitdb = await OrbitDB.createInstance(ipfs);
  // const db = await orbitdb.create("judgeUsers", "docstore");
  const db = await orbitdb.open(
    "/orbitdb/zdpuAnS9Tmviy7EQaLeSY1rZHpaF7C6gnhjtbCgAFRReQqryi/judgeUsers",
  );

  return { db, ipfs };
};

const getCaseDb = async () => {
  const ipfs = await IPFS.create(ipfsOptions);
  const orbitdb = await OrbitDB.createInstance(ipfs);
  // const db = await orbitdb.create("cases", "docstore");
  const db = await orbitdb.open(
    "/orbitdb/zdpuB3SEMmCeM1SYWQ5k6m2BKzUx9R4xibZ2RxX5qa4FaN2ka/cases",
  );
  return { db, ipfs };
};

export const createCase = async (data) => {
  const { db, ipfs } = await getCaseDb();
  await db.load();
  const {
    userId,
    name,
    court,
    nature,
    defendant,
    hash,
    description,
    caseCount,
  } = data;
  // const hash = bcrypt.hashSync(password, 10);
  let res = db.get("");

  await db.put({
    _id: caseCount + 1,
    userId: userId,
    name: name,
    court: court,
    nature: nature,
    defendant: defendant,
    hash: hash,
    files: [],
    vakkalath: null,
    statement: null,
    description,
    replication: null,
  });

  await db.close();
  await ipfs.stop();
};

export const createUser = async (user) => {
  const { db, ipfs } = await getUserDb();
  await db.load();
  const { fullName, password, email, address, phone } = user;
  // const hash = bcrypt.hashSync(password, 10);
  let res = db.get("");

  await db.put({
    _id: res.length + 1,
    fullname: fullName,
    password: password,
    email,
    address,
    phone,
  });

  res = db.get("");
  console.log(res);
  await db.close();
  await ipfs.stop();
};

export const getCaseForUser = async (userId) => {
  const { db, ipfs } = await getCaseDb();
  await db.load();
  const res = await db.query((doc) => doc.userId === userId);
  await db.close();
  await ipfs.stop();
  return res;
};

export const getAllCases = async () => {
  const { db, ipfs } = await getCaseDb();
  await db.load();
  const res = await db.get("");
  await db.close();
  await ipfs.stop();
  return res;
};

export const getCase = async (caseId) => {
  const { db, ipfs } = await getCaseDb();
  await db.load();
  const res = await db.query((doc) => {
    return doc._id == caseId;
  });
  await db.close();
  await ipfs.stop();
  return res[0];
};

export const addEvidence = async (caseId, evidence) => {
  const { db, ipfs } = await getCaseDb();
  await db.load();
  let res = await db.query((doc) => {
    return doc._id == caseId;
  });

  res[0].files = [...res[0].files, evidence];

  await db.put(res[0]);
  await db.close();
  await ipfs.stop();
  return res[0];
};

export const addStatement = async (caseId, evidence) => {
  const { db, ipfs } = await getCaseDb();
  await db.load();
  let res = await db.query((doc) => {
    return doc._id == caseId;
  });

  res[0].statement = evidence;

  await db.put(res[0]);
  await db.close();
  await ipfs.stop();
  console.log(res[0]);
  return res[0];
};

export const verifyEvidenceDb = async (caseId, path, verification) => {
  const { db, ipfs } = await getCaseDb();
  await db.load();
  let res = await db.query((doc) => {
    return doc._id == caseId;
  });

  res[0].files.map((x) => {
    if (x.path === path) {
      x.verification = verification;
    }
    return x;
  });

  await db.put(res[0]);
  await db.close();
  await ipfs.stop();
  return res[0];
};

export const verifyVakkalathDb = async (caseId, verification) => {
  const { db, ipfs } = await getCaseDb();
  await db.load();
  let res = await db.query((doc) => {
    return doc._id == caseId;
  });

  if (res[0].vakkalath) {
    res[0].vakkalath.verification = verification;
  }

  await db.put(res[0]);
  await db.close();
  await ipfs.stop();
  return res[0];
};

export const verifyReplicationDb = async (caseId, verification) => {
  const { db, ipfs } = await getCaseDb();
  await db.load();
  let res = await db.query((doc) => {
    return doc._id == caseId;
  });

  if (res[0].replication) {
    res[0].replication.verification = verification;
  }

  await db.put(res[0]);
  await db.close();
  await ipfs.stop();
  return res[0];
};

export const addReplication = async (caseId, evidence) => {
  const { db, ipfs } = await getCaseDb();
  await db.load();
  let res = await db.query((doc) => {
    return doc._id == caseId;
  });

  res[0].replication = evidence;

  await db.put(res[0]);
  await db.close();
  await ipfs.stop();
  return res[0];
};

export const addVakkalath = async (caseId, evidence) => {
  const { db, ipfs } = await getCaseDb();
  await db.load();
  let res = await db.query((doc) => {
    return doc._id == caseId;
  });

  res[0].vakkalath = evidence;

  await db.put(res[0]);
  await db.close();
  await ipfs.stop();
  return res[0];
};

export const loginUser = async (user) => {
  const { db, ipfs } = await getUserDb();
  await db.load();
  const { password, email } = user;

  const res = await db.query(
    (doc) => doc.password === password && doc.email === email,
  );

  localStorage.setItem("user_id", res[0]._id);

  await db.close();
  await ipfs.stop();
};

export const loginCourt = async (user) => {
  const { db, ipfs } = await getCourtUserDb();
  await db.load();
  const { password, email } = user;

  // await db.put({
  //   _id: 1,
  //   password: password,
  //   email,
  // });

  const res = await db.query(
    (doc) => doc.password === password && doc.email === email,
  );

  localStorage.setItem("court_user_id", res[0]._id);

  await db.close();
  await ipfs.stop();
};

export const loginJudge = async (user) => {
  const { db, ipfs } = await getJudgeUserDb();
  await db.load();
  const { password, email } = user;

  const res = await db.query(
    (doc) => doc.password === password && doc.email === email,
  );

  localStorage.setItem("court_user_id", res[0]._id);

  await db.close();
  await ipfs.stop();
};
