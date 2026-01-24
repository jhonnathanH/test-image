import moment from "moment";
import { Op } from "sequelize";

export const validateIntegerInQuery = (q: any) => {
  const where: any = q.where || {};
  let isInvalid = false;
  for (const k in where) {
    if ((k.toLowerCase() === "id" || k.toLowerCase() === "order") && isNaN(Number(where[k]))) {
      isInvalid = true;
    }
  }
  return isInvalid;
}

export const parseWhere = (q: any) => {
  const where: any = q.where || {};
  for (const k in where) {
    if (Object.prototype.hasOwnProperty.call(where, k) && where[k].$like) {
      where[k][Op.like] = `%${where[k].$like}%`;
      delete where[k].$like;
    }
  }

  return where;
};

export const parseSort = (q: any): any[] => {
  let orderBy: any;
  if (q.sort) {
    orderBy = [];
    Object.keys(q.sort).forEach(k => {
      const value = parseInt(q.sort[k]);
      const field = k.toLowerCase();
      const order = !isNaN(value) && value > 0 ? "asc" : "desc";
      orderBy.push([field, order]);
    });
  }
  return orderBy;
}

export const getDateTime = (format = "YYYY/MM/DD HH:mm") => {
  return moment(new Date()).format(format)
}

export const sleep = async (seconds: any) => {
  return await new Promise((resolve) => {
    if (!seconds) {
      seconds = 1000;
    }

    setTimeout(() => {
      return resolve(true);
    }, seconds);
  });
}

