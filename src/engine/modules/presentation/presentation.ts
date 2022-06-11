import { Component } from 'engine/core/ecs';
import type { Image } from 'engine/core/resources/image';
import type { TranslatableText } from 'i18n/translatable-text';

export class Presentation extends Component {
  name: TranslatableText;
  avatar: Image;

  constructor({ name, avatar }: { name: TranslatableText; avatar: Image }) {
    super();
    this.name = name;
    this.avatar = avatar;
  }
}
