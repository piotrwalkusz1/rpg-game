import { Component } from 'engine/core/ecs';
import type { Image } from 'engine/core/resources/image';
import type { TranslatableText } from 'i18n/translatable-text';

export class Character extends Component {
  readonly name: TranslatableText;
  readonly avatar: Image;

  constructor({ name, avatar }: { name: TranslatableText; avatar: Image }) {
    super();
    this.name = name;
    this.avatar = avatar;
  }
}
