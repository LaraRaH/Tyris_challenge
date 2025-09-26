/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';

@Injectable()
export class SignatureVerifierService {
  async verify(headers: Record<string, any>): Promise<boolean> {
    // TODO: implementar verificación JWT/Firma del push de Pub/Sub
    await Promise.resolve(); // mantiene el método async sin violar la regla
    return true;
  }
}
