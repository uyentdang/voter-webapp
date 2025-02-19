'use strict';

import {Organization, User} from '../../models';
import {Sequelize} from 'sequelize';

export async function index(req, res, next) {
  try {
    const organizations = await Organization.findAll({
      attributes: {
        include: [[Sequelize.fn('COUNT', Sequelize.col('users.organization')), 'memberCount']]
      },
      include: [{ model: User, attributes: []}],
      where: {
        public: true
      },
      group: ['organization.id'],
      order: [
        ['name']
      ]
    });
    return res.status(200).json({data: organizations});
  } catch(e) {
    return next(e);
  }
}

export async function create(req, res, next) {
  try {
    const {name} = req.body;
    const organization = await Organization.create({
      name,
      public: req.body.public
    });
    return res.status(200).json({data: organization});
  } catch(e) {
    return next(e);
  }
}

export async function show(req, res, next) {
  try {
    const {organizationId} = req.params;
    const organization = await Organization.findOne({
      where: {
        id: organizationId
      }
    });

    if (!organization) return res.status(404).end();
    return res.status(200).json({data: organization});
  } catch(e) {
    return next(e);
  }
}


export async function patch(req, res, next) {
  try {
    const {name, public: isPublic} = req.body;
    const {organizationId} = req.params;
    const organization = await Organization.findOne({
      where: {
        id: organizationId
      }
    });
    if (!organization) return res.status(404).end();
    organization.update({
      name, public: isPublic
    });
    return res.status(200).json({data: organization});
  } catch(e) {
    return next(e);
  }
}
